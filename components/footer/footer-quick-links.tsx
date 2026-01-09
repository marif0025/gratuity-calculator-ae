import type { SanityLink } from "@/sanity/lib/types"

interface FooterQuickLinksProps {
  quickLinks: {
    title?: string
    items?: SanityLink[]
  }
}

export default function FooterQuickLinks({ quickLinks }: FooterQuickLinksProps) {
  if (!quickLinks?.items || quickLinks.items.length === 0) {
    return null
  }

  return (
    <div>
      {quickLinks.title && (
        <h4 className="font-semibold text-lg mb-4">{quickLinks.title}</h4>
      )}
      <ul className="space-y-2 text-sm text-gray-400">
        {quickLinks.items.map((link, index) => (
          <li key={index}>
            {link.url ? (
              <a
                href={link.url}
                className="hover:text-white transition-colors"
                target={link.is_external ? "_blank" : undefined}
                rel={link.is_external ? "noopener noreferrer" : undefined}
              >
                {link.text}
              </a>
            ) : (
              <span className="text-gray-500">{link.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

