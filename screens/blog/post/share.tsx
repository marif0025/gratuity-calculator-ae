"use client";

export function BlogShare() {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share this article
            </h3>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            window.open(
                                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    document.title
                                )}&url=${encodeURIComponent(
                                    window.location.href
                                )}`,
                                "_blank"
                            );
                        }
                    }}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                    Twitter
                </button>
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            window.open(
                                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                    window.location.href
                                )}`,
                                "_blank"
                            );
                        }
                    }}
                    className="flex-1 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                >
                    LinkedIn
                </button>
            </div>
        </div>
    );
}
