
import type { AlertComponent } from "@/sanity/lib/types"
import { PortableTextComponent } from "../portable-text"

interface FooterLegalDisclaimerProps {
  legalDisclaimer: AlertComponent
}

export default function FooterLegalDisclaimer({ legalDisclaimer }: FooterLegalDisclaimerProps) {
  if (!legalDisclaimer) return null

  return (
    <div className="p-4 bg-gray-800 rounded-lg [&>p:last-child]:mb-0 [&>p]:text-xs [&>p]:text-gray-400 [&>p]:leading-relaxed">
      {legalDisclaimer.title &&
        <h5 className="font-semibold text-yellow-400 mb-2 text-sm">{legalDisclaimer.title}</h5>
      }
      <PortableTextComponent content={legalDisclaimer.content} />
    </div>
  )
}

