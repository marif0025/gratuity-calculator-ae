import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogPreview } from "@/sanity/lib/types";

interface BlogCardProps {
    blog: BlogPreview;
}

export function BlogCard({ blog }: BlogCardProps) {
    const formattedDate = blog.publishedAt
        ? format(new Date(blog.publishedAt), "MMM dd, yyyy")
        : null;

    return (
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <Link href={`/blog/${blog.slug.current}/`} className="block">
                {blog.featureImage && (
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={blog.featureImage.url}
                            alt={blog.featureImage.alt || blog.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {blog.category.name}
                        </span>
                        {formattedDate && (
                            <span className="text-sm text-gray-500">
                                {formattedDate}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                    </h3>

                    {blog.description && (
                        <p className="text-gray-600 line-clamp-3 mb-4">
                            {blog.description}
                        </p>
                    )}

                    <div className="flex items-center text-sm text-blue-600 font-medium">
                        Read more
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </Link>
        </article>
    );
}
