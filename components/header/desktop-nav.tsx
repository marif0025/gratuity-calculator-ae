"use client";

import { useApp } from "@/state/app";
import Link from "next/link";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";

export function DesktopNav() {
    const { config } = useApp();

    const navLinks = config?.header?.menu?.map((link) => ({
        href: link.url,
        label: link.text,
        isExternal: link.is_external,
    }));

    return (
        <>
            <nav className="hidden md:flex items-center gap-8">
                {navLinks?.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        target={link.isExternal ? "_blank" : "_self"}
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

            <MobileMenu navLinks={navLinks} />
        </>
    );
}
