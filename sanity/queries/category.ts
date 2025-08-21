import { groq } from 'next-sanity'

// Get all categories
export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    description,
    slug,
    seo {
      meta_title,
      meta_description,
      keywords,
      open_graph_image {
        asset->{
          _id,
          url,
          metadata{dimensions{width,height}}
        },
        alt
      },
      indexable
    }
  }
`

// Get category by slug
export const getCategoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    description,
    slug,
    seo {
      meta_title,
      meta_description,
      keywords,
      open_graph_image {
        asset->{
          _id,
          url,
          metadata{dimensions{width,height}}
        },
        alt
      },
      indexable
    }
  }
`

// Get all category slugs for static generation
export const getAllCategorySlugsQuery = groq`
  *[_type == "category"] {
    slug
  }
`

// Get blogs by category
export const getBlogsByCategoryQuery = groq`
  *[_type == "blog" && category->slug.current == $categorySlug && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    description,
    slug,
    featureImage {
      asset->{
        _id,
        url,
        metadata{dimensions{width,height}}
      },
      alt
    },
    category->{
      _id,
      name,
      slug
    },
    publishedAt,
    seo
  }
`
