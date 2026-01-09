import {
  FooterTopSection,
  FooterFeaturesGrid,
  FooterAbout,
  FooterQuickLinks,
  FooterCoverageAreas,
  FooterCopyright,
  FooterLegalLinks,
  FooterLegalDisclaimer,
} from "./footer/index"
import { getConfig } from "@/sanity/requests"
import type { ConfigFooter } from "@/sanity/lib/types"

export default async function Footer() {
  const config = await getConfig()
  const footerData: ConfigFooter | undefined = config?.footer

  if (!footerData) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {footerData.top_section && <FooterTopSection content={footerData.top_section} />}
            {footerData.features && footerData.features.length > 0 && (
              <FooterFeaturesGrid features={footerData.features} />
            )}

            {/* Links and Info Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {footerData.about && <FooterAbout content={footerData.about} />}
              {footerData.quick_links && <FooterQuickLinks quickLinks={footerData.quick_links} />}
              {footerData.coverage_areas && (
                <FooterCoverageAreas coverageAreas={footerData.coverage_areas} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <div className="max-w-6xl mx-auto">
          {footerData.legal_disclaimer && (
            <FooterLegalDisclaimer legalDisclaimer={footerData.legal_disclaimer} />
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {footerData.copyright && <FooterCopyright copyright={footerData.copyright} />}
              {footerData.legal_links && footerData.legal_links.length > 0 && (
                <FooterLegalLinks legalLinks={footerData.legal_links} />
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
