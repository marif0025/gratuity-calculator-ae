import { Shield, Clock, Calculator, Users } from "lucide-react"
import FooterFeatureCard from "./footer-feature-card"

export default function FooterFeaturesGrid() {
  const features = [
    {
      icon: Calculator,
      bgColor: "bg-blue-600",
      title: "Instant Calculation",
      description: "Get results in seconds",
    },
    {
      icon: Shield,
      bgColor: "bg-green-600",
      title: "MOHRE Compliant",
      description: "100% law-aligned",
    },
    {
      icon: Clock,
      bgColor: "bg-purple-600",
      title: "All Contract Types",
      description: "Limited & unlimited",
    },
    {
      icon: Users,
      bgColor: "bg-orange-600",
      title: "All Employee Types",
      description: "Including domestic workers",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <FooterFeatureCard key={index} {...feature} />
      ))}
    </div>
  )
}

