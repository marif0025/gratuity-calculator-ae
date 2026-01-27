import { extractPlainTextFromPortableText } from "@/lib/sanity/portable-text-utils";
import { renderJsonLd } from "@/lib/seo/jsonld";
import { GetConfigResponse, GetHomeResponse } from "@/sanity/requests";
import { FAQPage, SoftwareApplication, WebPage, WithContext } from "schema-dts";

// Constants
const DEFAULT_TITLE = "UAE Gratuity Calculator";
const DEFAULT_DESCRIPTION = "Calculate your gratuity with our free online calculator. Get instant results and understand your entitlements.";
const DEFAULT_BASE_URL = "https://www.gratuityuaecalculator.ae";
const SOFTWARE_APP_NAME = "UAE Gratuity Calculator";
const SOFTWARE_APP_DESCRIPTION = "Free online calculator for UAE end-of-service gratuity benefits. Calculate your entitlements instantly.";

export function resolveBaseUrl(config: GetConfigResponse): string {
  return config?.seo?.base_path || process.env.SITE_URL || DEFAULT_BASE_URL;
}

export function resolvePageTitle(home: GetHomeResponse): string {
  return home?.seo?.meta_title || home?.title || DEFAULT_TITLE;
}

export function resolvePageDescription(home: GetHomeResponse): string {
  return home?.seo?.meta_description || DEFAULT_DESCRIPTION;
}

function buildFaqEntities(home: GetHomeResponse) {
  if (!home?.faqs?.faqs || home.faqs.faqs.length === 0) {
    return [];
  }

  return home.faqs.faqs
    .map((faq) => ({
      question: faq.question,
      answer: extractPlainTextFromPortableText(faq.answer),
    }))
    .filter((faq) => faq.question && faq.answer);
}

export function buildHomeSchemas(
  home: GetHomeResponse,
  baseUrl: string
): Array<WithContext<WebPage> | WithContext<SoftwareApplication> | WithContext<FAQPage>> {
  const schemas: Array<WithContext<WebPage> | WithContext<SoftwareApplication> | WithContext<FAQPage>> = [];
  const pageTitle = resolvePageTitle(home);
  const pageDescription = resolvePageDescription(home);

  schemas.push(
    JSON.parse(
      renderJsonLd.webPage({
        name: pageTitle,
        description: pageDescription,
        url: baseUrl,
        isPartOf: { "@id": baseUrl },
      })
    ) as WithContext<WebPage>
  );

  schemas.push(
    JSON.parse(
      renderJsonLd.softwareApplication({
        name: SOFTWARE_APP_NAME,
        description: SOFTWARE_APP_DESCRIPTION,
        url: baseUrl,
        operatingSystem: "Web",
        applicationCategory: "FinanceApplication",
        offers: { price: 0, priceCurrency: "AED" },
      })
    ) as WithContext<SoftwareApplication>
  );

  const faqEntities = buildFaqEntities(home);
  if (faqEntities.length > 0) {
    schemas.push(
      JSON.parse(renderJsonLd.faqPage({ mainEntity: faqEntities })) as WithContext<FAQPage>
    );
  }

  return schemas;
}
