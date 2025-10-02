import { AlertData } from "@/sanity/lib/types";
import { PortableTextComponent } from "./portable-text";

const getAlertStyles = (type: string) => {
    switch (type) {
        case "info":
            return "bg-blue-50 border-blue-200 text-blue-800";
        case "warning":
            return "bg-yellow-50 border-yellow-200 text-yellow-800";
        case "error":
            return "bg-red-50 border-red-200 text-red-800";
        case "tip":
            return "bg-green-50 border-green-200 text-green-800";
        default:
            return "bg-gray-50 border-gray-200 text-gray-800";
    }
};

const getAlertIcon = (type: string) => {
    switch (type) {
        case "info":
            return "ℹ️";
        case "warning":
            return "⚠️";
        case "error":
            return "❌";
        case "tip":
            return "💡";
        default:
            return "ℹ️";
    }
};

export function Alert({ value }: { value: AlertData }) {
    if (!value) return null;

    return (
        <div
            className={`border-l-4 p-4 rounded-r-lg ${getAlertStyles(
                value.type
            )}`}
        >
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 text-lg">
                    {getAlertIcon(value.type)}
                </div>
                <div className="flex-1">
                    {value.title && (
                        <h3 className="text-lg font-semibold mb-2">
                            {value.title}
                        </h3>
                    )}
                    <div className="prose prose-sm max-w-none">
                        <PortableTextComponent content={value.content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
