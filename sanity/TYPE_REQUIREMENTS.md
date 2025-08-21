# Sanity Schema Type Requirements

This document outlines which fields are **required** vs **optional** in our TypeScript types, based on the Sanity schema validation rules.

## Blog Post (`BlogData`)

### Required Fields ✅

-   `_id: string`
-   `title: string` - Required with max 100 chars
-   `slug: { current: string }` - Required, auto-generated from title
-   `category: CategoryData` - Required reference

### Optional Fields ❓

-   `description?: string` - Optional, max 200 chars
-   `featureImage?: SanityImage` - Optional
-   `content?: any` - Optional PortableText content
-   `publishedAt?: string` - Optional (has initialValue)
-   `isPublished?: boolean` - Optional (has initialValue: false)
-   `seo?: SanitySEO` - Optional

## Blog Preview (`BlogPreview`)

### Required Fields ✅

-   `_id: string`
-   `title: string`
-   `slug: { current: string }`
-   `category: CategoryPreview`

### Optional Fields ❓

-   `description?: string`
-   `featureImage?: SanityImage`
-   `publishedAt?: string`

## Category (`CategoryData`)

### Required Fields ✅

-   `_id: string`
-   `name: string` - Required with max 50 chars
-   `slug: { current: string }` - Required, auto-generated from name

### Optional Fields ❓

-   `description?: string` - Optional, max 200 chars
-   `seo?: SanitySEO` - Optional

## Category Preview (`CategoryPreview`)

### Required Fields ✅

-   `_id: string`
-   `name: string`
-   `slug: { current: string }`

### Optional Fields ❓

-   `description?: string`

## Page (`PageData`)

### Required Fields ✅

-   `_id: string`
-   `title: string` - Required with max 100 chars
-   `slug: { current: string }` - Required, auto-generated from title
-   `pageType: 'contact' | 'privacy' | 'terms' | 'about' | 'faq' | 'other'` - Required

### Optional Fields ❓

-   `description?: string` - Optional, max 200 chars
-   `content?: any` - Optional PortableText content
-   `isPublished?: boolean` - Optional (has initialValue: false)
-   `seo?: SanitySEO` - Optional

## Page Preview (`PagePreview`)

### Required Fields ✅

-   `_id: string`
-   `title: string`
-   `slug: { current: string }`
-   `pageType: 'contact' | 'privacy' | 'terms' | 'about' | 'faq' | 'other'`

### Optional Fields ❓

-   `description?: string`
-   `seo?: SanitySEO`

## Home Page (`HomeData`)

### Required Fields ✅

-   `_id: string`

### Optional Fields ❓

-   `title?: string` - Optional (has initialValue: 'Home Page')
-   `hero?: HeroSection` - Optional
-   `seo?: SanitySEO` - Optional

## Site Config (`ConfigData`)

### Required Fields ✅

-   `_id: string`

### Optional Fields ❓

-   `site_name?: string` - Optional
-   `seo?: ConfigSEO` - Optional
-   `header?: ConfigHeader` - Optional
-   `footer?: ConfigFooter` - Optional

## Benefits of Updated Types

1. **Type Safety**: Required fields are now properly typed as non-optional
2. **Better IntelliSense**: IDE will show which fields are guaranteed to exist
3. **Runtime Safety**: TypeScript will catch missing required fields at compile time
4. **Documentation**: Comments clearly indicate which fields are required vs optional
5. **Schema Alignment**: Types now match the actual Sanity schema validation rules

## Usage Examples

```tsx
// ✅ Safe - category is required
const blog = await getBlogBySlug("my-blog");
if (blog) {
    console.log(blog.category.name); // No need to check if category exists
    console.log(blog.title); // No need to check if title exists
}

// ❌ TypeScript error - trying to access optional field without check
const blog = await getBlogBySlug("my-blog");
if (blog) {
    console.log(blog.description); // TypeScript error if not checked
}

// ✅ Safe - check optional field
const blog = await getBlogBySlug("my-blog");
if (blog?.description) {
    console.log(blog.description);
}
```

## Validation Rules Summary

-   **Required fields**: Use `Rule.required()` in schema
-   **Optional fields**: No validation rule or use `Rule.optional()`
-   **Initial values**: Fields with `initialValue` are still optional in types
-   **References**: Required references are non-optional in types
-   **Arrays**: Always optional unless explicitly required
-   **Objects**: Always optional unless explicitly required
