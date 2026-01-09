import { PortableTextComponent } from "@/components/portable-text"
import { cn } from "@/lib/utils"
import type { TypedObject } from "sanity"

interface FooterAboutProps {
  content: TypedObject | TypedObject[]
}

export default function FooterAbout({ content }: FooterAboutProps) {
  return (
    <div className={cn(
      "prose prose-invert prose-sm max-w-none",
      "prose-h4:font-semibold prose-h4:text-lg prose-h4:mb-4",
      "prose-p:text-gray-400 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-4"
    )}>
      <PortableTextComponent content={content} />
    </div>
  )
}

