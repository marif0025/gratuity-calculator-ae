import { Metadata } from "next";
import { Suspense, cache } from "react";
import { getHome, getConfig } from "@/sanity/requests";
import { HomeContentSkeleton } from "@/screens/home/skeletons";
import {
    buildHomeSchemas, resolveBaseUrl, resolvePageDescription, resolvePageTitle
} from "@/screens/home/home-schema";
import { Hero } from "@/components/hero";
import { ArticleSection } from "@/components/article-section";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ } from "@/components/faq";

const getCachedHome = cache(getHome);
const getCachedConfig = cache(getConfig);

export async function generateMetadata(): Promise<Metadata> {
    const home = await getCachedHome();
    const title = resolvePageTitle(home);
    const description = resolvePageDescription(home);
    const ogImage = home?.seo?.open_graph_image?.asset.url;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: ogImage,
        },
        twitter: {
            title,
            description,
            images: ogImage,
        },
    };
}

export default async function Home() {
    return (
        <>
            <Suspense fallback={null}>
                <HomePageJsonLd />
            </Suspense>
            <Hero />
            <Suspense fallback={<HomeContentSkeleton />}>
                <HomeContent />
            </Suspense>
        </>
    );
}

async function HomePageJsonLd() {
    const [home, config] = await Promise.all([getCachedHome(), getCachedConfig()]);
    const baseUrl = resolveBaseUrl(config);
    const schemas = buildHomeSchemas(home, baseUrl);

    return <JsonLd data={schemas} id="homepage-schemas" />;
}

async function HomeContent() {
    const home = await getCachedHome();

    return (
        <>
            {home?.content && <ArticleSection content={home.content} />}
            {home?.faqs && <FAQ content={home.faqs} />}
        </>
    );
}
