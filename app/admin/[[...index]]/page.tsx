import { Suspense } from "react";
import StudioPage from "./studio";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin - Gratuity Calculator",
    description: "Calculate your gratuity in UAE",
    robots: "noindex, nofollow",
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudioPage />
        </Suspense>
    );
}
