import { format } from "date-fns";
import Image from "next/image";
import { BlogData } from "@/sanity/lib/types";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BlogPostContent } from "./content";
import { TableOfContents } from "./table-of-contents";

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

            <article>
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {blog.description && (
                        <p className="sm:text-xl text-gray-600 mb-6 leading-relaxed">
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
                </header>

                <div className="grid lg:grid-cols-[400px_1fr] gap-6">
                    <aside className="lg:sticky top-20 h-fit">
                        <TableOfContents headings={blog.headings} />
                    </aside>

                    <BlogPostContent content={blog.content} />
                </div>
            </article>
        </div>
    );
}
