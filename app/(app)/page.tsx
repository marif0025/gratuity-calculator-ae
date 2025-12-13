import { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ArticleSection } from "@/components/article-section";
import { FAQ } from "@/components/faq";
import { getHome, getConfig } from "@/sanity/requests";
import { JsonLd } from "@/components/seo/json-ld";
import { renderJsonLd } from "@/lib/seo/jsonld";
import { extractPlainTextFromPortableText } from "@/lib/sanity/portable-text-utils";
import type { WithContext, WebPage, SoftwareApplication, FAQPage } from "schema-dts";

export async function generateMetadata(): Promise<Metadata> {
    const home = await getHome();

    const title = home?.seo?.meta_title ?? home?.title;
    const description =
        home?.seo?.meta_description ??
        "Calculate your gratuity with our free online calculator. Get instant results and understand your entitlements.";
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: home?.seo?.open_graph_image?.asset.url,
        },
        twitter: {
            title,
            description,
            images: home?.seo?.open_graph_image?.asset.url,
        },
    };
}

export default async function Home() {
    return (
        <>
            <Suspense fallback={<div></div>}>
                <HomePageJsonLd />
            </Suspense>
            <Hero />
            <Suspense fallback={<div></div>}>
                <HomeContent />
            </Suspense>
        </>
    );
}

async function HomePageJsonLd() {
    const [home, config] = await Promise.all([getHome(), getConfig()]);
    const baseUrl = config?.seo?.base_path || process.env.SITE_URL || 'https://www.gratuityuaecalculator.ae';

    const schemas: Array<WithContext<WebPage> | WithContext<SoftwareApplication> | WithContext<FAQPage>> = [];

    // WebPage schema
    const pageTitle = home?.seo?.meta_title || home?.title || 'UAE Gratuity Calculator';
    const pageDescription = home?.seo?.meta_description || 'Calculate your gratuity with our free online calculator. Get instant results and understand your entitlements.';

    schemas.push(JSON.parse(renderJsonLd.webPage({
        name: pageTitle,
        description: pageDescription,
        url: baseUrl,
        isPartOf: { '@id': baseUrl },
    })) as WithContext<WebPage>);

    // SoftwareApplication schema
    schemas.push(JSON.parse(renderJsonLd.softwareApplication({
        name: 'UAE Gratuity Calculator',
        description: 'Free online calculator for UAE end-of-service gratuity benefits. Calculate your entitlements instantly.',
        url: baseUrl,
        operatingSystem: 'Web',
        applicationCategory: 'FinanceApplication',
        offers: { price: 0, priceCurrency: 'AED' },
    })) as WithContext<SoftwareApplication>);

    // FAQPage schema (if FAQs exist)
    if (home?.faqs?.faqs && home.faqs.faqs.length > 0) {
        const faqMainEntity = home.faqs.faqs.map(faq => ({
            question: faq.question,
            answer: extractPlainTextFromPortableText(faq.answer),
        })).filter(faq => faq.question && faq.answer); // Filter out empty FAQs

        if (faqMainEntity.length > 0) {
            schemas.push(JSON.parse(renderJsonLd.faqPage({ mainEntity: faqMainEntity })) as WithContext<FAQPage>);
        }
    }

    return <JsonLd data={schemas} id="homepage-schemas" />;
}

async function HomeContent() {
    const home = await getHome();

    return (
        <>
            {home?.content && <ArticleSection content={home.content} />}
            {home?.faqs && <FAQ content={home.faqs} />}
        </>
    );
}
