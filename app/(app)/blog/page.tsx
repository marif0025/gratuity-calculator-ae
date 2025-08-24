import { Metadata } from "next";
import { getAllBlogs } from "@/sanity/requests";
import { BlogListingScreen } from "@/screens/blog/screen";
import { buildPageMeta } from "@/lib/seo/meta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMeta({
    title: "Blog",
    description:
        "Explore our latest articles and insights on gratuity calculations, financial planning, and more.",
    path: "/blog",
    allowIndex: true,
});

export default async function BlogPage() {
    const blogs = await getAllBlogs();

    return <BlogListingScreen blogs={blogs} />;
}
