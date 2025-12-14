"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TypedObject } from "sanity";
import { createSlug } from "@/lib/utils/slugify";

type PortableTextChild = {
    _key?: string;
    text?: string;
};

type PortableTextBlock = TypedObject & {
    style?: string;
    children?: PortableTextChild[];
};

interface UseActiveHeadingOptions {
    offset?: number;
}

export function useActiveHeading(
    headings?: PortableTextBlock[],
    options?: UseActiveHeadingOptions,
) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const activeRef = useRef<string | null>(null);

    const offset = options?.offset ?? 250;

    const headingSlugs = useMemo(() => {
        if (!headings?.length) return [];

        return headings
            .map((block) => {
                if (!block.style || !block.children) return null;

                const text =
                    block.children
                        .map((child) => child.text || "")
                        .join(" ")
                        .trim() || "Untitled";

                return createSlug(text);
            })
            .filter(Boolean) as string[];
    }, [headings]);

    useEffect(() => {
        if (!headingSlugs.length) {
            setActiveSection(null);
            activeRef.current = null;
            return;
        }

        const handleScroll = () => {
            const selector = headingSlugs.map((slug) => `#${slug}`).join(", ");
            if (!selector) return;

            const elements =
                document.querySelectorAll<HTMLElement>(selector) ?? [];

            let nextActive: string | null = null;

            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.top < offset && rect.top > 0) {
                    nextActive = element.id;
                }
            });

            if (!nextActive) return;

            if (nextActive !== activeRef.current) {
                activeRef.current = nextActive;
                setActiveSection(nextActive);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [headingSlugs, offset]);

    return activeSection;
}
