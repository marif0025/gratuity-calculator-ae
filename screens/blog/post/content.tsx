import { PortableTextComponent } from "@/components/portable-text";
import { TypedObject } from "sanity";

interface BlogPostContentProps {
    content?: TypedObject | TypedObject[];
}

export function BlogPostContent({ content }: BlogPostContentProps) {
    if (!content) return null;

    return (
        <div className="prose prose-md md:prose-lg prose-li:marker:text-gray-500 max-w-none">
            <PortableTextComponent content={content} />
        </div>
    );
}
