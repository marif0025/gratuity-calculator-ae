import { MapPin, Users } from "lucide-react"

export default function FooterCoverageAreas() {
  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">Coverage Areas</h4>
      <ul className="space-y-2 text-sm text-gray-400">
        <li className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          Dubai & Abu Dhabi
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          All 7 UAE Emirates
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          Free Zones (JAFZA, DMCC, DDA)
        </li>
        <li className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          Private Sector Employees
        </li>
        <li className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          Domestic Workers
        </li>
      </ul>
    </div>
  )
}

