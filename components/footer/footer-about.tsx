"use client"

import { Shield } from "lucide-react"

export default function FooterAbout() {
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">About UAE Gratuity Calculator</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Our free, MOHRE-aligned calculator helps employees across all UAE emirates calculate their
        end-of-service benefits accurately and instantly, based on the latest UAE Labour Law {currentYear}.
      </p>
      <div className="flex items-center gap-2 text-green-400">
        <Shield className="h-4 w-4" />
        <span className="text-sm">Trusted by 50,000+ employees</span>
      </div>
    </div>
  )
}

