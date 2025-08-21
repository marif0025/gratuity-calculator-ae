import { groq } from 'next-sanity'

export const getHomeQuery = groq`
  *[_type == "home"][0] {
    _id,
    title,
    hero {
      eyebrow,
      headline,
      subheadline,
      valueProps[] {
        icon,
        title,
        description
      },
      buttons[] {
        label,
        link,
        variant
      },
      trustIndicators[] {
        icon,
        text
      },
      heroImage {
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
      stats[] {
        value,
        label
      }
    },
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
