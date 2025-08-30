import { format } from "date-fns";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { BlogData } from "@/sanity/lib/types";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BlogPostContent } from "./content";
import { BlogPostSidebar } from "./sidebar";

interface BlogPostScreenProps {
    blog: BlogData;
}

export function BlogPostScreen({ blog }: BlogPostScreenProps) {
    const formattedDate = blog.publishedAt
        ? format(new Date(blog.publishedAt), "MMMM dd, yyyy")
        : null;

    return (
        <div className="container mx-auto px-4 py-24">
            <Breadcrumbs
                items={[
                    { name: "Home", href: "/" },
                    { name: "Blog", href: "/blog" },
                    {
                        name: blog.category.name,
                        href: `/blog/category/${blog.category.slug.current}`,
                    },
                    {
                        name: blog.title,
                        href: `/blog/${blog.slug.current}`,
                        current: true,
                    },
                ]}
            />

            <article className="mt-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {blog.category.name}
                            </span>
                            {formattedDate && (
                                <span className="text-gray-500 text-sm">
                                    {formattedDate}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {blog.description && (
                            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                {blog.description}
                            </p>
                        )}

                        {blog.featureImage && (
                            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                                <Image
                                    src={blog.featureImage.url}
                                    alt={blog.featureImage.alt || blog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <BlogPostContent content={blog.content} />
                    </div>

                    <div className="lg:col-span-1">
                        <BlogPostSidebar
                            category={blog.category}
                            publishedAt={blog.publishedAt}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
}
