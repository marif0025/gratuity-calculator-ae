import Link from "next/link";
import { Calculator } from "lucide-react";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3 text-inherit">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2">
                <Calculator className="size-6" />
            </span>
            <span className="flex flex-col">
                <span className="font-bold text-lg">UAE Gratuity</span>
                <span className="text-xs -mt-1">Calculator</span>
            </span>
        </Link>
    );
}
