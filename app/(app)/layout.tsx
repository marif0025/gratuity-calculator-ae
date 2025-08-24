import { AppProvider } from "@/state/app";
import { getConfig } from "@/sanity/requests";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata() {
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
    };
}

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = await getConfig();

    return (
        <AppProvider config={config}>
            <main className="min-h-screen">
                <Header />
                {children}
                <Footer />
            </main>
        </AppProvider>
    );
}
