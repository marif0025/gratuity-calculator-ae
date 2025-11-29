import { groq } from 'next-sanity'

export const getAllBlogsQuery = groq`
  *[_type == "blog" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    description,
    slug,
    featureImage {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "alt": alt
    },
    category->{
      _id,
      name,
      slug
    },
    publishedAt,
    seo {
      meta_title,
      meta_description,
      keywords,
      open_graph_image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      indexable
    }
  }
`

export const getBlogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    description,
    slug,
    featureImage {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "alt": alt
    },
    category->{
      _id,
      name,
      slug
    },
    content,
    "headings": content[style in ["h1", "h2", "h3", "h4", "h5", "h6"]],
    publishedAt,
    isPublished,
    seo {
      meta_title,
      meta_description,
      keywords,
      open_graph_image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      indexable
    }
  }
`

export const getRecentBlogsQuery = groq`
  *[_type == "blog" && isPublished == true] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    description,
    slug,
    featureImage {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "alt": alt
    },
    category->{
      _id,
      name,
      slug
    },
    publishedAt
  }
`

export const getAllBlogSlugsQuery = groq`
  *[_type == "blog" && isPublished == true] {
    slug
  }
`
