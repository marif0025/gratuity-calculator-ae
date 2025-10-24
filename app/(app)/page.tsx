import { Hero } from "@/components/hero";
import { ArticleSection } from "@/components/article-section";
import { FAQ } from "@/components/faq";

export default async function Home() {
    return (
        <>
            <Hero />
            <ArticleSection />
            <FAQ />
        </>
    );
}
