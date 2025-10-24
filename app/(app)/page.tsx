import { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ArticleSection } from "@/components/article-section";
import { FAQ } from "@/components/faq";
import { getHome } from "@/sanity/requests";

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
            <Hero />
            <Suspense fallback={<div>Home content loading...</div>}>
                <HomeContent />
            </Suspense>
        </>
    );
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
