import type { SanityLink } from "@/sanity/lib/types"

interface FooterLegalLinksProps {
  legalLinks: SanityLink[]
}

export default function FooterLegalLinks({ legalLinks }: FooterLegalLinksProps) {
  if (!legalLinks || legalLinks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
      {legalLinks.map((link, index) => (
        <a
          key={index}
          href={link.url || "#"}
          className="hover:text-white transition-colors"
          target={link.is_external ? "_blank" : undefined}
          rel={link.is_external ? "noopener noreferrer" : undefined}
        >
          {link.text}
        </a>
      ))}
    </div>
  )
}

