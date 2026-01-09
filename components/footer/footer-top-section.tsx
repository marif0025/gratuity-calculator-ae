import { PortableTextComponent } from "@/components/portable-text"
import { cn } from "@/lib/utils"
import type { TypedObject } from "sanity"

interface FooterTopSectionProps {
  content: TypedObject | TypedObject[]
}

export default function FooterTopSection({ content }: FooterTopSectionProps) {
  return (
    <div className="text-center mb-12">
      <div
        className={cn(
          "prose prose-invert max-w-3xl mx-auto",
          "prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mb-4"
        )}
      >
        <PortableTextComponent content={content} />
      </div>
    </div>
  )
}

