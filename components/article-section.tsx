import { BookOpen } from "lucide-react";
import { HomeContentBlock } from "@/sanity.types";
import { HomeContent } from "@/sanity/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { PortableTextComponent } from "./portable-text";

interface ArticleSectionProps {
    content: HomeContent;
}

export function ArticleSection({ content }: ArticleSectionProps) {
    return (
        <section id="guide" className="py-16 bg-gray-50">
            <div className="w-full max-w-4xl mx-auto px-4">
                {content.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4  text-center">
                        {content.title}
                    </h2>
                )}
                {content.description && (
                    <p className="text-lg text-gray-600  text-center">
                        {content.description}
                    </p>
                )}

                <ContentBlocks blocks={content.blocks} />
            </div>
        </section>
    );
}

function ContentBlocks({ blocks }: { blocks: HomeContent["blocks"] }) {
    if (!blocks || !blocks?.length) return null;

    return (
        <div className="space-y-8 mt-12">
            {blocks.map((block) => (
                <ContentBlock key={block.title} block={block} />
            ))}
        </div>
    );
}

function ContentBlock({ block }: { block: HomeContentBlock }) {
    return (
        <Card className="gap-0">
            {block.title && (
                <div className="flex items-center gap-3 px-6 mb-3">
                    <BookOpen className="size-6" />
                    <h2 className="text-2xl font-semibold">{block.title}</h2>
                </div>
            )}

            {block.content && (
                <CardContent className="prose max-w-none prose-table:m-0">
                    <PortableTextComponent content={block.content} />
                </CardContent>
            )}
        </Card>
    );
}
