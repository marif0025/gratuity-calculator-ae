import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/sanity/requests/page";
import { getConfig } from "@/sanity/requests";
import { PortableTextComponent } from "@/components/portable-text";
import { buildPageMeta } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { renderJsonLd } from "@/lib/seo/jsonld";
import type { PageData } from "@/sanity/lib/types";
import type { WithContext, WebPage, BreadcrumbList } from "schema-dts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = page.seo?.meta_title ?? page.title;
  const description =
    page.seo?.meta_description ||
    page.description ||
    `Read our page about ${page.title}`;

  // Transform Sanity image structure to buildPageMeta format
  const images = page.seo?.open_graph_image
    ? [
      {
        url: page.seo.open_graph_image.asset.url,
        width: page.seo.open_graph_image.asset.metadata.dimensions.width,
        height: page.seo.open_graph_image.asset.metadata.dimensions.height,
        alt: page.seo.open_graph_image.alt || title,
      },
    ]
    : undefined;

  return buildPageMeta({
    title,
    description,
    path: `/${slug}/`,
    images,
    allowIndex: page.seo?.indexable ?? false,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Format page type for display
  const formatPageType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <>
      <PageJsonLd page={page} slug={slug} />
      <div className="container max-w-5xl! mx-auto px-4 py-24">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            {
              name: page.title,
              href: `/${slug}`,
              current: true,
            },
          ]}
        />

        <article>
          <header className="grid gap-6 mb-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {page.title}
              </h1>

              {page.description && (
                <p className="sm:text-xl text-gray-600 mb-6 leading-relaxed">
                  {page.description}
                </p>
              )}
            </div>
          </header>

          {page.content && (
            <div className="prose prose-md md:prose-lg prose-li:marker:text-gray-500 max-w-none">
              <PortableTextComponent content={page.content} />
            </div>
          )}
        </article>
      </div>
    </>
  );
}

async function PageJsonLd({ page, slug }: { page: PageData, slug: string }) {
  const config = await getConfig();
  const baseUrl = config?.seo?.base_path || process.env.SITE_URL || 'https://www.gratuityuaecalculator.ae';

  const pageUrl = `${baseUrl}/${slug}/`;
  const title = page.seo?.meta_title ?? page.title;
  const description = page.seo?.meta_description || page.description || `Read our page about ${page.title}`;

  const schemas: Array<WithContext<WebPage> | WithContext<BreadcrumbList>> = [];

  // WebPage schema
  schemas.push(JSON.parse(renderJsonLd.webPage({
    name: title,
    description,
    url: pageUrl,
    isPartOf: { '@id': baseUrl },
  })) as WithContext<WebPage>);

  // BreadcrumbList schema
  schemas.push(JSON.parse(renderJsonLd.breadcrumbList([
    { name: "Home", url: baseUrl },
    { name: title, url: pageUrl },
  ])) as WithContext<BreadcrumbList>);

  return <JsonLd data={schemas} id="page-schemas" />;
}
