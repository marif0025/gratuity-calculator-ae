import { cn } from "@/lib/utils"

interface FooterFeatureCardProps {
  svgIcon?: string
  bgColor?: string
  title: string
  description: string
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  purple: "bg-purple-600",
  orange: "bg-orange-600",
  red: "bg-red-600",
}

export default function FooterFeatureCard({ svgIcon, bgColor, title, description }: FooterFeatureCardProps) {
  const bgColorClass = bgColor ? colorMap[bgColor] || `bg-${bgColor}-600` : "bg-blue-600"

  return (
    <div className="text-center flex flex-col items-center justify-center gap-3">
      <SVGIcon svgIcon={svgIcon} className={bgColorClass} />
      <div className="grid gap-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}

interface SVGIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  svgIcon?: string
}

function SVGIcon({ svgIcon, className, ...props }: SVGIconProps) {
  if (!svgIcon) return null;

  return (
    <span className={cn("size-12 rounded-lg flex items-center justify-center", className)} {...props}>
      <i
        className="size-6"
        dangerouslySetInnerHTML={{ __html: svgIcon }}
      />
    </span>
  )
}
