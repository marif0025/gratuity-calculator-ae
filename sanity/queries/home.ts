import { groq } from 'next-sanity'

export const getHomeQuery = groq`
  *[_type == "home"][0] {
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
    }
  }
`
