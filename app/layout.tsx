import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn("antialiased", geistSans.variable, geistMono.variable)}>
                {children}
            </body>
        </html>
    );
}
