"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/header/logo";
import { MobileMenu } from "@/components/header/mobile-menu";
import { cn } from "@/lib/utils";

export const navLinks = [
    {
        label: "Blog",
        href: "/blog",
    },
    {
        label: "Calculator",
        href: "/#calculator",
    },

    {
        label: "Guide",
        href: "/#guide",
    },

    {
        label: "FAQ",
        href: "/#faq",
    },
];
// Three header states:
// 1. "top" - at top of page, no scroll
// 2. "in-hero" - scrolled, but still within hero section
// 3. "scrolled" - scrolled past hero section
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
    return (
        //  bg-white/5 backdrop-blur-md
        <header
            className={cn("fixed top-0 left-0 right-0 z-50 text-white", {
                "bg-white/5 backdrop-blur-md": headerState === "in-hero",
                "bg-white/20 backdrop-blur-md text-black":
                    headerState === "scrolled",
            })}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-inherit font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Button
                            asChild
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                            <Link href="/#calculator">Calculate Now</Link>
                        </Button>
                    </nav>

                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}
