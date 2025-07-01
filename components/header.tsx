"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Menu, X, FileText, HelpCircle } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">UAE Gratuity</div>
              <div className="text-xs text-gray-600 -mt-1">Calculator</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection("guide")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Guide
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection("calculator")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Calculate Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("calculator")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Calculator
            </button>
            <button
              onClick={() => scrollToSection("guide")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FileText className="h-4 w-4" />
              Guide
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </button>
            <div className="px-4">
              <Button
                onClick={() => scrollToSection("calculator")}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Calculate Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
