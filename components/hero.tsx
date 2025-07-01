"use client"

import { Calculator, Shield, CheckCircle, ArrowRight, Users, Building, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg>")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Shield className="h-4 w-4 text-green-300" />
              <span className="text-sm font-medium">MOHRE-Certified • 100% Free • Instant Results</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Calculate Your UAE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Gratuity Benefits
                </span>
                <span className="block">in 30 Seconds</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                Get instant, accurate end-of-service calculations for all UAE emirates.
                <span className="font-semibold text-white">Know your rights, claim what you've earned.</span>
              </p>
            </div>

            {/* Value Propositions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="bg-green-500 rounded-full p-1">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Instant Results</div>
                  <div className="text-xs text-blue-200">No waiting, no paperwork</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="bg-blue-500 rounded-full p-1">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">100% Accurate</div>
                  <div className="text-xs text-blue-200">UAE Labour Law 2025</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="bg-purple-500 rounded-full p-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">All Employee Types</div>
                  <div className="text-xs text-blue-200">Private, domestic, free zone</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="bg-orange-500 rounded-full p-1">
                  <Building className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">All Emirates</div>
                  <div className="text-xs text-blue-200">Dubai, Abu Dhabi & more</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                Calculate My Gratuity Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg text-black"
                onClick={() => document.querySelector('[data-section="guide"]')?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm">Used by 50,000+ employees</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm">MOHRE guidelines compliant</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm">No registration required</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual */}
          <div className="relative lg:pl-8">
            {/* Main Hero Image Container */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-3xl transform rotate-6"></div>

              {/* Hero Image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  {/* Calculator Mockup */}
                  <div className="w-full max-w-sm space-y-4">
                    {/* Mock Calculator Header */}
                    <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-yellow-300" />
                        <div className="h-3 bg-white/40 rounded w-24"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/30 rounded w-full"></div>
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                      </div>
                    </div>

                    {/* Mock Result Display */}
                    <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg p-6 backdrop-blur-sm border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">AED 45,000</div>
                        <div className="text-sm text-blue-200">Your Estimated Gratuity</div>
                      </div>
                    </div>

                    {/* Mock Action Button */}
                    <div className="bg-gradient-to-r from-yellow-400/80 to-orange-400/80 rounded-lg p-3 backdrop-blur-sm">
                      <div className="h-3 bg-white/60 rounded w-32 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
                <Shield className="h-6 w-6 text-gray-900" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3 shadow-lg animate-bounce delay-500">
                <CheckCircle className="h-6 w-6 text-gray-900" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">2025</div>
                <div className="text-sm text-blue-200">Latest UAE Law</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">7</div>
                <div className="text-sm text-blue-200">All Emirates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          
        </svg>
      </div>
    </section>
  )
}
