import { BookOpen } from "lucide-react";
import { HomeContentBlock } from "@/sanity.types";
import { HomeContent } from "@/sanity/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortableTextComponent } from "./portable-text";

interface ArticleSectionProps {
    content: HomeContent;
}

export function ArticleSection({ content }: ArticleSectionProps) {
    return (
        <section id="guide" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        {content.title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {content.title}
                            </h2>
                        )}
                        {content.description && (
                            <p className="text-lg text-gray-600">
                                {content.description}
                            </p>
                        )}
                    </div>

                    <ContentBlocks blocks={content.blocks} />
                </div>
            </div>
        </section>
    );
}

function ContentBlocks({ blocks }: { blocks: HomeContent["blocks"] }) {
    if (!blocks || !blocks?.length) return null;

    return (
        <div className="space-y-8">
            {blocks.map((block) => (
                <ContentBlock key={block.title} block={block} />
            ))}
        </div>
    );
}

function ContentBlock({ block }: { block: HomeContentBlock }) {
    return (
        <Card>
            {block.title && (
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <h3>{block.title}</h3>
                    </CardTitle>
                </CardHeader>
            )}

            {block.content && (
                <CardContent className="prose max-w-none">
                    <PortableTextComponent content={block.content} />
                </CardContent>
            )}
        </Card>
    );
}
