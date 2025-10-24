import { groq } from 'next-sanity'

export const getHomeQuery = groq`
  *[_type == "home" && _id == "home"] {
    _id,
    title,
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
    },
    content {
      title,
      description,
      blocks[] {
        title,
        icon,
        content
      }
    },
    faqs {
      title,
      description,
      faqs[] {
        question,
        answer
      }
    }
  }[0]
`
