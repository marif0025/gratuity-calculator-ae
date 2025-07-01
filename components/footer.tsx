"use client"

import { Shield, Clock, Calculator, Users, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Know Your Rights, Get What You Deserve</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Understanding your end-of-service gratuity is not just about numbers — it's about knowing your legal
                rights as an employee in the UAE. Whether you're a professional working in Dubai, a domestic worker in
                Abu Dhabi, or an employee in any free zone like JAFZA or DMCC, your gratuity is a financial benefit
                you've earned with your hard work.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Instant Calculation</h3>
                <p className="text-sm text-gray-400">Get results in seconds</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">MOHRE Compliant</h3>
                <p className="text-sm text-gray-400">100% law-aligned</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">All Contract Types</h3>
                <p className="text-sm text-gray-400">Limited & unlimited</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">All Employee Types</h3>
                <p className="text-sm text-gray-400">Including domestic workers</p>
              </div>
            </div>

            {/* Links and Info Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* About */}
              <div>
                <h4 className="font-semibold text-lg mb-4">About UAE Gratuity Calculator</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Our free, MOHRE-aligned calculator helps employees across all UAE emirates calculate their
                  end-of-service benefits accurately and instantly, based on the latest UAE Labour Law 2025.
                </p>
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Trusted by 50,000+ employees</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <button
                      onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-white transition-colors"
                    >
                      Gratuity Calculator
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        document.querySelector('[data-section="guide"]')?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="hover:text-white transition-colors"
                    >
                      Complete Guide
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                      className="hover:text-white transition-colors"
                    >
                      FAQ
                    </button>
                  </li>
                  <li>
                    <span className="text-gray-500">UAE Labour Law 2025</span>
                  </li>
                  <li>
                    <span className="text-gray-500">MOHRE Guidelines</span>
                  </li>
                </ul>
              </div>

              {/* Coverage Areas */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm mb-2">
                  © 2025 UAE Gratuity Calculator. Free tool for calculating end-of-service benefits.
                </p>
                <p className="text-xs text-gray-500">
                  This calculator is based on UAE Labour Law 2025 and MOHRE guidelines.
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <span>Privacy Policy</span>
                <span>Terms of Use</span>
                <span>Legal Disclaimer</span>
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-yellow-400 mb-2 text-sm">Important Legal Disclaimer</h5>
              <p className="text-xs text-gray-400 leading-relaxed">
                This calculator provides estimates based on UAE Labour Law 2025 and MOHRE guidelines. Results are for
                informational purposes only and should not be considered as legal advice. Actual gratuity calculations
                may vary based on specific employment contracts, company policies, and individual circumstances. For
                definitive legal guidance regarding your specific situation, please consult with a qualified legal
                professional or HR specialist familiar with UAE employment law. The calculator creators assume no
                liability for decisions made based on these calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
