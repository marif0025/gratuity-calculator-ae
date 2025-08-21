import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "./image";

// Custom components for PortableText rendering
const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null;

            const imageUrl = urlForImage(value.asset)?.url();
            if (!imageUrl) return null;

            return (
                <figure className="my-6">
                    <Image
                        src={imageUrl}
                        alt={value.alt || ""}
                        width={value.asset?.metadata?.dimensions?.width || 800}
                        height={
                            value.asset?.metadata?.dimensions?.height || 600
                        }
                        className="w-full h-auto rounded-lg"
                        priority={false}
                    />
                    {value.alt && (
                        <figcaption className="mt-2 text-sm text-gray-600 text-center">
                            {value.alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    marks: {
        link: ({ value, children }) => {
            const target = (value?.href || "").startsWith("http")
                ? "_blank"
                : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={
                        target === "_blank" ? "noopener noreferrer" : undefined
                    }
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {children}
                </a>
            );
        },
    },
    block: {
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-3 mt-5">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-bold mb-2 mt-3">{children}</h4>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
    },
};

/**
 * Render PortableText content with custom components
 * @param content - PortableText content from Sanity
 * @returns JSX element with rendered content
 */
export function renderPortableText(content: any) {
    if (!content) return null;

    return <PortableText value={content} components={components} />;
}

/**
 * Get plain text from PortableText content
 * @param content - PortableText content from Sanity
 * @returns Plain text string
 */
export function getPlainText(content: any): string {
    if (!content) return "";

    return content
        .map((block: any) => {
            if (block._type === "block") {
                return block.children.map((child: any) => child.text).join("");
            }
            return "";
        })
        .join("\n")
        .trim();
}
