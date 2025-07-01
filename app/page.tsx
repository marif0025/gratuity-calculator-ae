import Header from "@/components/header"
import Hero from "@/components/hero"
import { Calculator } from "@/components/calculator"
import { ArticleSection } from "@/components/article-section"
import { FAQ } from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Calculator />
      <ArticleSection />
      <FAQ />
      <Footer />
    </div>
  )
}
