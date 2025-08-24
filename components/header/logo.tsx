import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/state/app";

export function Logo() {
    const { config } = useApp();
    const logo = config?.header?.logo;
    const logoUrl = logo?.image?.asset.url;
    const logoText =
        logo?.image?.alt ??
        logo?.text ??
        config?.site_name ??
        "Gratuity Calculator";

    if (!logoUrl) return null;

    return (
        <Link href="/" className="flex items-center gap-3 text-inherit">
            <Image
                src={logoUrl}
                alt={logoText}
                width={100}
                height={100}
                className="!h-auto"
            />
        </Link>
    );
}
