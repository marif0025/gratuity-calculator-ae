"use client";

import dynamic from "next/dynamic";
import HeroCalculator from "@/components/hero/calculator";
import { DEFAULT_HERO } from "@/components/hero/defaults";
import type { HomeHeroCalculator } from "@/sanity/lib/types";

const CalculatorHero = dynamic(
  () => import("./calculator-hero").
    then(mod => mod.CalculatorHero),
  {
    ssr: false,
    loading: () => <Skeleton />
  });

interface CalculatorProps {
  calculator?: HomeHeroCalculator;
}

export function Calculator({ calculator }: CalculatorProps) {
  const content = calculator ?? DEFAULT_HERO.calculator;

  return (
    <div
      id="calculator"
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <HeroCalculator
        title={content.title}
        description={content.description}
      />
      <CalculatorHero />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6">
      {/* Last Monthly Basic Salary */}
      <div className="space-y-2">
        <div className="h-5 w-56 bg-white/20 rounded animate-pulse" />
        <div className="h-10 w-full bg-white/10 rounded animate-pulse" />
        <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
      </div>

      {/* Employment Period */}
      <div className="space-y-3">
        <div className="h-5 w-40 bg-white/20 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
          <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Unpaid Leave Days */}
      <div className="space-y-2">
        <div className="h-5 w-40 bg-white/20 rounded animate-pulse" />
        <div className="h-12 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
      </div>

      {/* Calculate My Gratuity */}
      <div className="h-12 w-full bg-white/20 rounded-lg mt-3 animate-pulse" />
    </div>
  );
}
