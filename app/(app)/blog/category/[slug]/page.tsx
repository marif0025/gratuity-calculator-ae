import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    getCategoryBySlug,
    getBlogsByCategory,
    getAllCategorySlugs,
    CategoryData,
    BlogPreview,
} from "@/sanity/requests";
import { CategoryScreen } from "@/screens/blog/category/screen";
import { buildPageMeta } from "@/lib/seo/meta";
import { renderJsonLd } from "@/lib/seo/jsonld";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
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
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found",
            robots: { index: false, follow: false },
        };
    }

    const title = category.seo?.meta_title || `${category.name} Articles`;
    const description =
        category.seo?.meta_description ||
        `Explore all articles in the ${category.name} category`;

    return buildPageMeta({
        title,
        description,
        path: `/blog/category/${slug}/`,
        allowIndex: category?.seo?.indexable ?? false,
    });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const [category, blogs] = await Promise.all([
        getCategoryBySlug(slug),
        getBlogsByCategory(slug),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <>
            <CategoryJsonLd category={category} blogs={blogs} />
            <CategoryScreen category={category} blogs={blogs} />
        </>
    );
}

function CategoryJsonLd({
    category,
    blogs,
}: {
    category: CategoryData;
    blogs: BlogPreview[];
}) {
    const slug = category.slug.current;
    const url = `${process.env.SITE_URL}/blog/category/${slug}/`;
    const description =
        category.seo?.meta_description ||
        category.description ||
        `All articles in the ${category.name} category`;
    const title = category.seo?.meta_title ?? `${category.name} Articles`;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: renderJsonLd.collectionPage({
                    name: title,
                    description,
                    url,
                    itemListElement: blogs.map((blog, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        item: {
                            "@type": "Article",
                            headline: blog.title,
                            description: blog.description,
                            url: `${process.env.SITE_URL}/blog/${blog.slug.current}/`,
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
    );
}
