import { GetConfigResponse } from "@/sanity/requests";
import { buildPageMeta } from "../meta";

export function buildLayoutMeta(config: GetConfigResponse) {
  const seo = config?.seo;
  const title = seo?.meta_title ?? "Gratuity Calculator";
  const description =
    seo?.meta_description ?? "Calculate your gratuity in UAE";
  const basePath = seo?.base_path ?? "/";
  const indexable = seo?.indexable ?? true;
  const openGraphImage =
    seo?.open_graph_image?.asset.url ??
    config?.header?.logo?.image?.asset.url;
  const favicon = seo?.favicon?.asset.url;

  // Transform image to buildPageMeta format
  const images = openGraphImage
    ? [
      {
        url: openGraphImage,
        alt: title,
      },
    ]
    : undefined;

  const baseMeta = buildPageMeta({
    title,
    description,
    path: basePath,
    images,
    allowIndex: indexable,
  });

  return {
    ...baseMeta,
    icons: {
      icon: favicon,
    },
    verification: {
      google: seo?.google_tag,
    },
  };
}