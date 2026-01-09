interface FooterCopyrightProps {
  copyright: {
    copyright_text?: string
    disclaimer_text?: string
  }
}

export default function FooterCopyright({ copyright }: FooterCopyrightProps) {
  if (!copyright) return null

  return (
    <div className="text-center md:text-left">
      {copyright.copyright_text && (
        <p className="text-gray-400 text-sm mb-2">{copyright.copyright_text}</p>
      )}
      {copyright.disclaimer_text && (
        <p className="text-xs text-gray-500">{copyright.disclaimer_text}</p>
      )}
    </div>
  )
}

