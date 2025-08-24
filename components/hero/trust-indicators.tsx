import { CheckCircle } from "lucide-react";

interface TrustIndicator {
    text: string;
}

const trustIndicators: TrustIndicator[] = [
    { text: "Used by 50,000+ employees" },
    { text: "MOHRE guidelines compliant" },
    { text: "No registration required" },
];

export default function TrustIndicators() {
    return (
        <div className="flex flex-wrap items-center gap-6 pt-4 mt-6 lg:mt-8">
            {trustIndicators.map((indicator, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 text-blue-200"
                >
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-sm">{indicator.text}</span>
                </div>
            ))}
        </div>
    );
}
