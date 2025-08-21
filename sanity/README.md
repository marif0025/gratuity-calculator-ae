# Sanity CMS Request Layer

This directory contains a comprehensive request layer for fetching data from Sanity CMS in Next.js applications. The layer provides type-safe server actions that can be used in server components.

## Structure

```
sanity/
├── lib/
│   ├── client.ts          # Sanity client configuration
│   ├── types.ts           # TypeScript type definitions
│   ├── portable-text.ts   # PortableText rendering utilities
│   └── image.ts           # Image utilities
├── queries/
│   ├── home.ts            # Home page queries
│   ├── config.ts          # Site configuration queries
│   ├── blog.ts            # Blog post queries
│   ├── page.ts            # Page queries
│   └── index.ts           # Query exports
├── requests/
│   ├── home.ts            # Home page server actions
│   ├── config.ts          # Config server actions
│   ├── blog.ts            # Blog server actions
│   ├── page.ts            # Page server actions
│   └── index.ts           # Request exports
├── schemas/               # Sanity schema definitions
└── examples/
    └── usage-examples.tsx # Usage examples
```

## Features

-   ✅ **Type-safe server actions** for Next.js server components
-   ✅ **Comprehensive TypeScript types** for all data structures
-   ✅ **Error handling** with graceful fallbacks
-   ✅ **PortableText rendering** utilities
-   ✅ **Image optimization** support
-   ✅ **SEO data** integration
-   ✅ **Static generation** support with slug queries

## Usage

### Basic Usage in Server Components

```tsx
import { getHome, getConfig } from "@/sanity/requests";

export default async function HomePage() {
    const [homeData, configData] = await Promise.all([getHome(), getConfig()]);

    if (!homeData) {
        return <div>Home page not found</div>;
    }

    return (
        <div>
            <h1>{homeData.title}</h1>
            {homeData.hero?.headline && <h2>{homeData.hero.headline}</h2>}
        </div>
    );
}
```

### Blog Posts

```tsx
import { getAllBlogs, getBlogBySlug } from "@/sanity/requests";
import { renderPortableText } from "@/sanity/lib/portable-text";

// Blog list
export async function BlogList() {
    const blogs = await getAllBlogs();

    return (
        <div>
            {blogs.map((blog) => (
                <article key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                </article>
            ))}
        </div>
    );
}

// Single blog post
export async function BlogPost({ slug }: { slug: string }) {
    const blog = await getBlogBySlug(slug);

    if (!blog) return <div>Not found</div>;

    return (
        <article>
            <h1>{blog.title}</h1>
            {blog.content && renderPortableText(blog.content)}
        </article>
    );
}
```

### Pages

```tsx
import { getPageBySlug, getPageByType } from "@/sanity/requests";

// Dynamic page
export async function Page({ slug }: { slug: string }) {
    const page = await getPageBySlug(slug);

    if (!page) return <div>Page not found</div>;

    return (
        <div>
            <h1>{page.title}</h1>
            {page.content && renderPortableText(page.content)}
        </div>
    );
}

// Contact page
export async function ContactPage() {
    const page = await getPageByType("contact");

    if (!page) return <div>Contact page not found</div>;

    return (
        <div>
            <h1>{page.title}</h1>
            {page.content && renderPortableText(page.content)}
        </div>
    );
}
```

## Available Functions

### Home Page

-   `getHome()` - Fetch home page data

### Configuration

-   `getConfig()` - Fetch site configuration

### Blog Posts

-   `getAllBlogs()` - Fetch all published blog posts
-   `getBlogBySlug(slug)` - Fetch single blog post by slug
-   `getRecentBlogs(limit)` - Fetch recent blog posts
-   `getAllBlogSlugs()` - Fetch all blog slugs for static generation

### Pages

-   `getAllPages()` - Fetch all published pages
-   `getPageBySlug(slug)` - Fetch single page by slug
-   `getPagesByType(type)` - Fetch pages by type
-   `getPageByType(type)` - Fetch first page of specific type
-   `getAllPageSlugs()` - Fetch all page slugs for static generation

## TypeScript Types

All functions are fully typed. Import types from the requests index:

```tsx
import type {
    HomeData,
    BlogData,
    PageData,
    ConfigData,
} from "@/sanity/requests";
```

## PortableText Rendering

Use the `renderPortableText` utility to render rich text content:

```tsx
import { renderPortableText } from "@/sanity/lib/portable-text";

export function ContentRenderer({ content }: { content: any }) {
    return <div>{renderPortableText(content)}</div>;
}
```

## Error Handling

All functions include error handling and return safe defaults:

-   **Home/Config**: Returns `null` if not found
-   **Blogs/Pages**: Returns empty array `[]` if no results
-   **Single items**: Returns `null` if not found

## Static Generation

For static generation, use the slug functions:

```tsx
import { getAllBlogSlugs, getAllPageSlugs } from "@/sanity/requests";

export async function generateStaticParams() {
    const [blogSlugs, pageSlugs] = await Promise.all([
        getAllBlogSlugs(),
        getAllPageSlugs(),
    ]);

    return [
        ...blogSlugs.map(({ slug }) => ({ slug: slug.current })),
        ...pageSlugs.map(({ slug }) => ({ slug: slug.current })),
    ];
}
```

## Best Practices

1. **Use server components** for data fetching
2. **Parallel requests** when fetching multiple data sources
3. **Error boundaries** for graceful error handling
4. **Type safety** by importing types
5. **SEO optimization** using the provided SEO data
6. **Image optimization** using the image metadata

## Environment Variables

Ensure these environment variables are set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11
```

## Dependencies

-   `next-sanity` - Sanity client
-   `@portabletext/react` - PortableText rendering
-   `@sanity/image-url` - Image URL builder

This request layer provides a robust, type-safe way to fetch data from Sanity CMS in Next.js applications.
