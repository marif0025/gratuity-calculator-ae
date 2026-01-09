import type { FooterCoverageArea } from "@/sanity/lib/types"

interface FooterCoverageAreasProps {
  coverageAreas: {
    title?: string
    areas?: FooterCoverageArea[]
  }
}

export default function FooterCoverageAreas({ coverageAreas }: FooterCoverageAreasProps) {
  if (!coverageAreas?.areas || coverageAreas.areas.length === 0) {
    return null
  }

  return (
    <div>
      {coverageAreas.title && (
        <h4 className="font-semibold text-lg mb-4">{coverageAreas.title}</h4>
      )}
      <ul className="space-y-2 text-sm text-gray-400">
        {coverageAreas.areas.map((area, index) => (
          <li key={index} className="flex items-center gap-2">
            {area.svg_icon ? (
              <div
                className="h-3 w-3 shrink-0"
                dangerouslySetInnerHTML={{ __html: area.svg_icon }}
              />
            ) : (
              <div className="h-3 w-3 shrink-0 bg-gray-500 rounded-full" />
            )}
            <span>{area.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

