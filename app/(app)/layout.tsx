import { Metadata } from "next";
import Script from "next/script";
import { cache, Fragment } from "react";

import { AppProvider } from "@/state/app";
import { getConfig } from "@/sanity/requests";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { GlobalJsonLd } from "@/components/seo";
import { buildLayoutMeta } from "@/lib/seo/meta";

const getConfigCache = cache(getConfig);

export async function generateMetadata(): Promise<Metadata> {
    const config = await getConfigCache();
    return buildLayoutMeta(config);
}

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = await getConfigCache();

    return (
        <AppProvider config={config}>
            <GlobalJsonLd config={config} />
            <main className="min-h-screen">
                <Header />
                {children}
                <Footer />
            </main>

            {
                config?.seo?.indexable &&
                config?.seo?.google_tag_manager_id &&
                <GoogleTagManager googleTagManagerId={config.seo.google_tag_manager_id} />
            }

            <script
                async
                defer
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9109061590646279"
                crossOrigin="anonymous"
            />
        </AppProvider>
    );
}

function GoogleTagManager(
    { googleTagManagerId }: { googleTagManagerId: string }
) {
    return (
        <Fragment>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`} />
            <Script>
                {`
                         window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleTagManagerId}');
                    `}
            </Script>
        </Fragment>
    )
}

