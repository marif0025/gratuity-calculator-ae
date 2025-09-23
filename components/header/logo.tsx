import Link from "next/link";
import { Calculator } from "lucide-react";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-inherit">
            <Calculator className="size-8" />
        </Link>
    );
}
