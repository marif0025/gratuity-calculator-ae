import { Hero } from "@/components/hero";
import { Calculator } from "@/components/calculator";
import { ArticleSection } from "@/components/article-section";
import { FAQ } from "@/components/faq";

export default async function Home() {
    return (
        <>
            <Hero />
            <Calculator />
            <ArticleSection />
            <FAQ />
        </>
    );
}
