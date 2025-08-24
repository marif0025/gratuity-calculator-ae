import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    getCategoryBySlug,
    getBlogsByCategory,
    getAllCategorySlugs,
} from "@/sanity/requests";
import { CategoryScreen } from "@/screens/blog/category/screen";
import { buildPageMeta } from "@/lib/seo/meta";
import { renderJsonLd } from "@/lib/seo/jsonld";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = await getAllCategorySlugs();
    return slugs.map((slug) => ({
        slug: slug.slug.current,
    }));
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const category = await getCategoryBySlug((await params).slug);

    if (!category) {
        return {
            title: "Category Not Found",
            robots: { index: false, follow: false },
        };
    }

    return buildPageMeta({
        title: `${category.name} Articles`,
        description:
            category.description ||
            `Explore all articles in the ${category.name} category`,
        path: `/blog/category/${(await params).slug}`,
        allowIndex: true,
    });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const [category, blogs] = await Promise.all([
        getCategoryBySlug((await params).slug),
        getBlogsByCategory((await params).slug),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: renderJsonLd.collectionPage({
                        name: `${category.name} Articles`,
                        description:
                            category.description ||
                            `All articles in the ${category.name} category`,
                        url: `${process.env.SITE_URL}/blog/category/${
                            (await params).slug
                        }`,
                        itemListElement: blogs.map((blog, index) => ({
                            "@type": "ListItem",
                            position: index + 1,
                            item: {
                                "@type": "Article",
                                headline: blog.title,
                                description: blog.description,
                                url: `https://yourdomain.com/blog/${blog.slug.current}`,
                                image: blog.featureImage
                                    ? {
                                          "@type": "ImageObject",
                                          url: blog.featureImage.url,
                                          width: blog.featureImage.width,
                                          height: blog.featureImage.height,
                                      }
                                    : undefined,
                            },
                        })),
                    }),
                }}
            />
            <CategoryScreen category={category} blogs={blogs} />
        </>
    );
}
