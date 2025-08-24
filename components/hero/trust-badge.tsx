import { Shield } from "lucide-react";

export default function TrustBadge() {
    return (
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-5">
            <Shield className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">
                MOHRE-Certified • 100% Free • Instant Results
            </span>
        </div>
    );
}
