import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs } from "@/sanity/requests";
import { BlogPostScreen } from "@/screens/blog/post/screen";
import { buildPageMeta } from "@/lib/seo/meta";
import { renderJsonLd } from "@/lib/seo/jsonld";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({
        slug: slug.slug.current,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const blog = await getBlogBySlug((await params).slug);

    if (!blog) {
        return {
            title: "Blog Post Not Found",
            robots: { index: false, follow: false },
        };
    }

    return buildPageMeta({
        title: blog.title,
        description: blog.description || `Read our article about ${blog.title}`,
        path: `/blog/${(await params).slug}`,
        images: blog.featureImage ? [blog.featureImage] : undefined,
        allowIndex: true,
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const blog = await getBlogBySlug((await params).slug);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: renderJsonLd.article({
                        headline: blog.title,
                        description: blog.description,
                        datePublished: blog.publishedAt,
                        dateModified: blog.publishedAt,
                        author: {
                            "@type": "Organization",
                            name: "Gratuity Calculator",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Gratuity Calculator",
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `${process.env.SITE_URL}/blog/${
                                (await params).slug
                            }`,
                        },
                        image: blog.featureImage
                            ? {
                                  "@type": "ImageObject",
                                  url: blog.featureImage.url,
                                  width: blog.featureImage.width,
                                  height: blog.featureImage.height,
                              }
                            : undefined,
                    }),
                }}
            />
            <BlogPostScreen blog={blog} />
        </>
    );
}
