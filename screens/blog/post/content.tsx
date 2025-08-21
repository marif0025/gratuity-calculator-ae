import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface BlogPostContentProps {
    content?: any;
}

export function BlogPostContent({ content }: BlogPostContentProps) {
    if (!content) {
        return (
            <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">
                    No content available for this article.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-8 prose prose-lg max-w-none">
            <PortableText
                value={content}
                components={{
                    types: {
                        image: ({ value }) => {
                            if (!value?.asset?._ref) return null;

                            return (
                                <div className="my-8">
                                    <Image
                                        src={value.asset.url}
                                        alt={value.alt || ""}
                                        width={800}
                                        height={600}
                                        className="rounded-lg w-full h-auto"
                                    />
                                    {value.caption && (
                                        <p className="text-sm text-gray-500 text-center mt-2">
                                            {value.caption}
                                        </p>
                                    )}
                                </div>
                            );
                        },
                    },
                    block: {
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 first:mt-0">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6 first:mt-0">
                                {children}
                            </h3>
                        ),
                        h4: ({ children }) => (
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4 first:mt-0">
                                {children}
                            </h4>
                        ),
                        normal: ({ children }) => (
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {children}
                            </p>
                        ),
                    },
                    list: {
                        bullet: ({ children }) => (
                            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                                {children}
                            </ul>
                        ),
                        number: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                                {children}
                            </ol>
                        ),
                    },
                    listItem: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                    ),
                    marks: {
                        link: ({ children, value }) => (
                            <a
                                href={value?.href}
                                className="text-blue-600 hover:text-blue-800 underline"
                                target={
                                    value?.href?.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    value?.href?.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            >
                                {children}
                            </a>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-semibold text-gray-900">
                                {children}
                            </strong>
                        ),
                        em: ({ children }) => (
                            <em className="italic text-gray-800">{children}</em>
                        ),
                    },
                }}
            />
        </div>
    );
}
