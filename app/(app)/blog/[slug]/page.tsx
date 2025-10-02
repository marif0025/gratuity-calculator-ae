import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, BlogData } from "@/sanity/requests";
import { BlogPostScreen } from "@/screens/blog/post/screen";
import { buildPageMeta } from "@/lib/seo/meta";
import { renderJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

// export async function generateStaticParams() {
//     const slugs = await getAllBlogSlugs();
//     return slugs.map((slug) => ({
//         slug: slug.slug.current,
//     }));
// }

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Blog Post Not Found",
            robots: { index: false, follow: false },
        };
    }

    const title = blog.seo?.meta_title ?? blog.title;
    const description =
        blog.seo?.meta_description ||
        blog.description ||
        `Read our article about ${blog.title}`;

    return buildPageMeta({
        title,
        description,
        path: `/blog/${slug}/`,
        images: blog.featureImage ? [blog.featureImage] : undefined,
        allowIndex: blog.seo?.indexable ?? false,
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <BlogPostJsonLd blog={blog} />
            <BlogPostScreen blog={blog} />
        </>
    );
}

function BlogPostJsonLd({ blog }: { blog: BlogData }) {
    const slug = blog.slug.current;
    const url = `${process.env.SITE_URL}/blog/${slug}/`;
    const description =
        blog.seo?.meta_description ||
        blog.description ||
        `Read our article about ${blog.title}`;
    const title = blog.seo?.meta_title ?? blog.title;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: renderJsonLd.article({
                    headline: title,
                    description,
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
                        "@id": url,
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
    );
}
