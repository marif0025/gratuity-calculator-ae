import { BlogPreview } from "@/sanity/lib/types";
import { BlogCard } from "./blog-card";
import { BlogHero } from "./hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface BlogListingScreenProps {
    blogs: BlogPreview[];
}

export function BlogListingScreen({ blogs }: BlogListingScreenProps) {
    return (
        <div className="min-h-screen pt-24 bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs
                    items={[
                        { name: "Home", href: "/" },
                        { name: "Blog", href: "/blog", current: true },
                    ]}
                />

                <BlogHero />

                <section className="mt-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Latest Articles
                        </h2>
                        <p className="text-gray-600 max-w-2xl">
                            Explore our latest insights on gratuity
                            calculations, financial planning, and everything you
                            need to know about end-of-service benefits.
                        </p>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No articles yet
                            </h3>
                            <p className="text-gray-600">
                                Check back soon for our latest articles and
                                insights.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
