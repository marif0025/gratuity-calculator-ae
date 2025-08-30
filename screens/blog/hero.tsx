import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function BlogHero() {
    const title =
        "<small>Understanding</small> <strong>Gratuity Benefits</strong> in the UAE";

    return (
        <section className="pt-22 lg:pt-30 md:pt-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-6">
                    <h1
                        className="text-4xl md:text-6xl font-bold leading-tightW [&>strong]:text-purple-500 [&>strong]:font-bold flex flex-col"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p className="text-gray-400 text-lg md:text-xl">
                        In-Depth guidance to help understand and calculate
                        gratuity benefits for UAE employees.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Link href="/blog">Latest Articles</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-900"
                        >
                            Join Newsletter
                        </Button>
                    </div>
                </div>

                <div className="relative h-100 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                        src="/images/blog-hero-image-500x500.png"
                        alt="Gratuity Benefits"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
