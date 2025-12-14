import { getSimilarBlogs } from "@/sanity/requests";
import { BlogCard } from "@/screens/blog/blog-card";

interface SimilarPostsProps {
    currentSlug: string;
}

export async function SimilarPosts({ currentSlug }: SimilarPostsProps) {
    const similarBlogs = await getSimilarBlogs(currentSlug);

    if (similarBlogs.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 lg:mt-24 border-t border-gray-200">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Similar Articles
                </h2>
                <p className="text-gray-600 max-w-2xl">
                    Explore more articles related to this topic.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </section>
    );
}
