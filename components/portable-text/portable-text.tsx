"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    PortableText,
    toPlainText,
    type PortableTextComponents,
    type PortableTextBlockComponent,
    type PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { TypedObject } from "sanity";

import { urlForImage } from "@/sanity/lib/image";
import { TableBlockData, FAQsBlock, AlertData } from "@/sanity/lib/types";
import { getHeadingId } from "@/lib/utils/heading-ids";

import { Table } from "./table";
import { PortableTextFAQs } from "./faqs";
import { Alert } from "./alert";

type ImageValue = {
    asset: any;
    alt?: string;
};

function makeHeading(
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
): PortableTextBlockComponent {
    return function Heading({ children, value }) {
        const id = getHeadingId(value);

        return React.createElement(
            tag,
            { id, className: "scroll-mt-24" },
            children,
        );
    };
}

const components: PortableTextComponents = {
    types: {
        iimage: ({ value }: { value: ImageValue }) => {
            if (!value?.asset) return null;

            const src = urlForImage(value.asset).url();
            const alt = value.alt || "";

            return (
                <Image
                    src={src}
                    alt={alt}
                    width={1280}
                    height={720}
                    className="w-full h-auto rounded-lg"
                />
            );
        },

        tableBlock: ({ value }: { value: TableBlockData }) => {
            if (!value?.table) return null;

            return (
                <Table
                    data={value.table}
                    title={value.title}
                    caption={value.caption}
                />
            );
        },

        faqs: ({ value }: { value: FAQsBlock }) => (
            <PortableTextFAQs value={value} />
        ),

        alert: ({ value }: { value: AlertData }) => <Alert value={value} />,
    },

    block: {
        h1: makeHeading("h1"),
        h2: makeHeading("h2"),
        h3: makeHeading("h3"),
        h4: makeHeading("h4"),
        h5: makeHeading("h5"),
        h6: makeHeading("h6"),
    },

    marks: {
        link: ({
            value,
            children,
        }: PortableTextMarkComponentProps) => {
            const href = value?.href || "";
            if (!href) return <>{children}</>;

            const siteDomain =
                process.env.NEXT_PUBLIC_SITE_DOMAIN?.replace(
                    /^https?:\/\//,
                    "",
                ).replace(/\/$/, "") || "";

            const isInternal =
                href.startsWith("/") ||
                href.startsWith("#") ||
                (siteDomain && href.includes(siteDomain));

            if (isInternal) {
                return <Link href={href}>{children}</Link>;
            }

            // External link → open in new tab
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                >
                    {children}
                </a>
            );
        },
    },
};

export function PortableTextComponent({
    content,
}: {
    content: TypedObject | TypedObject[];
}) {
    const value = Array.isArray(content) ? content : [content];

    return <PortableText components={components} value={value} />;
}
