"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import {
    Drawer,
    DrawerTitle,
    DrawerHeader,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type TProps = {
    navLinks?: {
        href: string;
        label: string;
        isExternal?: boolean;
    }[];
};

export function MobileMenu({ navLinks }: TProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DrawerTrigger asChild>
                <Button className="md:hidden" variant="ghost" size="icon">
                    <Menu className="size-6" />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="hidden">Menu</DrawerTitle>
                </DrawerHeader>

                <div className="border-t border-gray-200 py-4 space-y-4">
                    {navLinks?.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
