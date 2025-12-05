import { groq } from 'next-sanity'

export const getConfigQuery = groq`
  *[_type == "config"][0] {
    _id,
    site_name,
    seo {
      meta_title,
      meta_description,
      favicon {
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
      base_path,
      sitemap_url,
      indexable,
      google_tag,
      google_tag_manager_id,
      scripts
    },
    header {
      logo {
        image {
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
        url,
        text
      },
      menu[] {
        text,
        url,
        is_external
      },
      cta_button {
        text,
        url,
        is_external
      }
    },
    footer {
      footer_text,
      menu[] {
        text,
        url,
        is_external
      },
      social_links[] {
        text,
        url,
        is_external
      }
    }
  }
`
