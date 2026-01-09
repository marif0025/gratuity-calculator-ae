import FooterFeatureCard from "./footer-feature-card"
import type { FooterFeature } from "@/sanity/lib/types"

interface FooterFeaturesGridProps {
  features: FooterFeature[]
}

export default function FooterFeaturesGrid({ features }: FooterFeaturesGridProps) {
  if (!features || features.length === 0) {
    return null
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <FooterFeatureCard
          key={index}
          svgIcon={feature.svg_icon}
          bgColor={feature.bgColor}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

