import { LucideIcon } from "lucide-react"

interface FooterFeatureCardProps {
  icon: LucideIcon
  bgColor: string
  title: string
  description: string
}

export default function FooterFeatureCard({ icon: Icon, bgColor, title, description }: FooterFeatureCardProps) {
  return (
    <div className="text-center">
      <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}

