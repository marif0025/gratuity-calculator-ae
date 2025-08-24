"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/header/logo";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./desktop-nav";

type HeaderState = "top" | "in-hero" | "scrolled";

// Height of the hero section in px (should match actual hero height)
const HERO_SECTION_ID = "hero";
const DEFAULT_HERO_HEIGHT = 600; // fallback if not found

function getHeroBottom(): number {
    if (typeof window === "undefined") return DEFAULT_HERO_HEIGHT;
    const hero = document.getElementById(HERO_SECTION_ID);
    if (hero) {
        const rect = hero.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height;
    }
    return DEFAULT_HERO_HEIGHT;
}

function useHeaderState(): HeaderState {
    const [headerState, setHeaderState] = useState<HeaderState>("top");

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY;
            if (scrollY === 0) {
                setHeaderState("top");
                return;
            }
            const heroBottom = getHeroBottom();
            if (scrollY < heroBottom - 80) {
                setHeaderState("in-hero");
            } else {
                setHeaderState("scrolled");
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Run on mount in case user reloads mid-scroll
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return headerState;
}

export function Header() {
    const headerState = useHeaderState();
    const isHome = usePathname() === "/";

    return (
        //  bg-white/5 backdrop-blur-md
        <header
            className={cn("fixed top-0 left-0 right-0 z-50 text-white", {
                "bg-white/5 backdrop-blur-md":
                    isHome && headerState === "in-hero",
                "bg-white/20 backdrop-blur-md text-black":
                    isHome && headerState === "scrolled",
                "bg-white/5 backdrop-blur-md text-black": !isHome,
            })}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Logo />
                    <DesktopNav />
                </div>
            </div>
        </header>
    );
}
