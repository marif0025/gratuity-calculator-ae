import { AppProvider } from "@/state/app";
import { getConfig } from "@/sanity/requests";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
    const config = await getConfig();
    const seo = config?.seo;
    const title = seo?.meta_title ?? "Gratuity Calculator";
    const description =
        seo?.meta_description ?? "Calculate your gratuity in UAE";
    const basePath = seo?.base_path ?? "/";
    const indexable = seo?.indexable ?? true;
    const openGraphImage =
        seo?.open_graph_image?.asset.url ??
        config?.header?.logo?.image?.asset.url;
    const favicon = seo?.favicon?.asset.url;

    return {
        title,
        description,
        robots: indexable ? "index, follow" : "noindex, nofollow",
        openGraph: {
            title,
            description,
            images: openGraphImage,
        },
        alternates: {
            canonical: basePath,
        },
        icons: {
            icon: favicon,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: openGraphImage,
        },
        metadataBase: new URL(basePath),
        verification: {
            google: seo?.google_tag,
        }
    };
}

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = await getConfig();
    const scripts = config?.seo?.scripts?.map(s => s);

    return (
        <AppProvider config={config}>
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

            {
                config?.seo?.indexable && <Script>
                    {
                        `(function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "uh7nm0mc0b");`
                    }
                </Script>
            }

            {config?.seo?.indexable && scripts && scripts.length > 0 ? scripts.map((script) => (
                <div key={script} dangerouslySetInnerHTML={{ __html: script }} />
            )) : null}
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
