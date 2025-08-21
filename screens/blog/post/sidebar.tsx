import Link from "next/link";
import { format } from "date-fns";
import { CategoryData } from "@/sanity/lib/types";
import { BlogShare } from "./share";

interface BlogPostSidebarProps {
    category: CategoryData;
    publishedAt?: string;
}

export function BlogPostSidebar({
    category,
    publishedAt,
}: BlogPostSidebarProps) {
    const formattedDate = publishedAt
        ? format(new Date(publishedAt), "MMMM dd, yyyy")
        : null;

    return (
        <aside className="space-y-6">
            {/* Category Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Category
                </h3>
                <div className="space-y-3">
                    <Link
                        href={`/blog/category/${category.slug.current}`}
                        className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <div className="font-medium text-blue-900">
                            {category.name}
                        </div>
                        {category.description && (
                            <p className="text-sm text-blue-700 mt-1">
                                {category.description}
                            </p>
                        )}
                    </Link>
                </div>
            </div>

            {/* Article Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Article Info
                </h3>
                <div className="space-y-3 text-sm">
                    {formattedDate && (
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-gray-600">
                                Published: {formattedDate}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-gray-600">
                            Category: {category.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Share */}
            <BlogShare />

            {/* Back to Blog */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <Link
                    href="/blog"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Blog
                </Link>
            </div>
        </aside>
    );
}
