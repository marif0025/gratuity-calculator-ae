import { CategoryData, BlogPreview } from "@/sanity/lib/types";
import { BlogCard } from "../blog-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface CategoryScreenProps {
    category: CategoryData;
    blogs: BlogPreview[];
}

export function CategoryScreen({ category, blogs }: CategoryScreenProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs
                    items={[
                        { name: "Home", href: "/" },
                        { name: "Blog", href: "/blog" },
                        {
                            name: category.name,
                            href: `/blog/category/${category.slug.current}`,
                            current: true,
                        },
                    ]}
                />

                <section className="mt-8">
                    {/* Category Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {category.description}
                            </p>
                        )}
                        <div className="mt-6">
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {blogs.length} article
                                {blogs.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No articles in this category yet
                            </h3>
                            <p className="text-gray-600">
                                Check back soon for articles in the{" "}
                                {category.name} category.
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
