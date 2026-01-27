import { renderJsonLd } from "@/lib/seo/jsonld";
import { GetConfigResponse } from "@/sanity/requests";
import { Organization, WebSite, WithContext } from "schema-dts";
import { JsonLd } from "./json-ld";

interface IProps {
  config: GetConfigResponse
}

export function GlobalJsonLd({ config }: IProps) {
  const baseUrl = config?.seo?.base_path || process.env.SITE_URL || 'https://www.gratuityuaecalculator.ae';
  const siteName = config?.site_name || 'Gratuity Calculator';

  const organizationSchema = JSON.parse(renderJsonLd.organization({
    name: siteName,
    url: baseUrl,
    logo: config?.header?.logo?.image?.asset?.url ? {
      url: config.header.logo.image.asset.url,
      width: config.header.logo.image.asset.metadata?.dimensions?.width,
      height: config.header.logo.image.asset.metadata?.dimensions?.height,
    } : undefined,
  })) as WithContext<Organization>;

  const websiteSchema = JSON.parse(renderJsonLd.website({
    name: siteName,
    url: baseUrl,
  })) as WithContext<WebSite>;

  return <JsonLd data={[organizationSchema, websiteSchema]} id="global-schemas" />
}
