import { Calculator, Shield, CheckCircle } from "lucide-react";

export default function HeroVisual() {
    return (
        <div className="relative lg:pl-8">
            {/* Main Hero Image Container */}
            <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-3xl transform rotate-6"></div>

                {/* Hero Image */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="min-h-[450px] bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
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
                                    <div className="text-2xl font-bold text-white mb-1">
                                        AED 45,000
                                    </div>
                                    <div className="text-sm text-blue-200">
                                        Your Estimated Gratuity
                                    </div>
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
    );
}
