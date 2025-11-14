import { groq } from 'next-sanity'

export const getAllPagesQuery = groq`
  *[_type == "page" && isPublished == true] | order(pageType asc, title asc) {
    _id,
    title,
    description,
    slug,
    pageType,
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

export const getPageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    description,
    slug,
    content,
    pageType,
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

export const getPagesByTypeQuery = groq`
  *[_type == "page" && pageType == $pageType && isPublished == true] | order(title asc) {
    _id,
    title,
    description,
    slug,
    pageType,
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

export const getAllPageSlugsQuery = groq`
  *[_type == "page" && isPublished == true] {
    slug
  }
`
