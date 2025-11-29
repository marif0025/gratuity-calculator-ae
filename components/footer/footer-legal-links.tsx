export default function FooterLegalLinks() {
  const links = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookies" },
    // { href: "/contact", label: "Contact" },
    { href: "/disclaimer", label: "Legal Disclaimer" },
    { href: "/about-us", label: "About" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
      {links.map((link) => (
        <a key={link.href} href={link.href} className="hover:text-white transition-colors">
          {link.label}
        </a>
      ))}
    </div>
  )
}

