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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FooterTopSection />
            <FooterFeaturesGrid />

            {/* Links and Info Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <FooterAbout />
              <FooterQuickLinks />
              <FooterCoverageAreas />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <div className="max-w-6xl mx-auto">
          <FooterLegalDisclaimer />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <FooterCopyright />
              <FooterLegalLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
