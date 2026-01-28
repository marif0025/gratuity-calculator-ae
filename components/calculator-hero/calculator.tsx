"use client";

import dynamic from "next/dynamic";

const CalculatorHero = dynamic(
  () => import("./calculator-hero").
    then(mod => mod.CalculatorHero),
  {
    ssr: false,
    loading: () => <Skeleton />
  });

export function Calculator() {
  return (
    <div
      id="calculator"
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <CalculatorHero />
    </div>
  );
}

function Skeleton() {
  return (
    <div
      id="calculator"
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="h-8 w-64 bg-white/20 rounded-lg mb-4 animate-pulse" />
      <div className="h-4 w-full bg-white/20 rounded-lg mb-4 animate-pulse" />
      <div className="space-y-6">
        {/* Salary field skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-48 bg-white/20 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
        </div>

        {/* Employment Period skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-40 bg-white/20 rounded mb-3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
            <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
          </div>
        </div>

        {/* Contract Type skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-32 bg-white/20 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
        </div>

        {/* Reason for Leaving skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-40 bg-white/20 rounded mb-2 animate-pulse" />
          <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 w-full bg-white/20 rounded-lg mt-3 animate-pulse" />
      </div>
    </div>
  )
}
