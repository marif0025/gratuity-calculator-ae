import Image from "next/image";
import { PortableText, toPlainText } from "@portabletext/react";
import { TypedObject } from "sanity";

import { urlForImage } from "@/sanity/lib/image";
import { createSlug } from "@/lib/utils/slugify";
import {
    FAQData,
    FAQsBlock,
    TableBlockData,
    AlertData,
} from "@/sanity/lib/types";

import { Table } from "./table";
import { PortableTextFAQs } from "./faqs";
import { Alert } from "./alert";

export function PortableTextComponent({
    content,
}: {
    content: TypedObject | TypedObject[];
}) {
    const components = {
        types: {
            iimage: ({ value }: { value: any }) => {
                return (
                    <Image
                        src={urlForImage(value.asset).url()}
                        alt={value.alt}
                        width={1280}
                        height={720}
                        className="rounded-lg w-full h-auto"
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
            faqs: ({ value }: { value: FAQsBlock }) => {
                return <PortableTextFAQs value={value} />;
            },
            alert: ({ value }: { value: AlertData }) => <Alert value={value} />,
        },
        block: {
            h1: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h1 id={slug} className="scroll-mt-20">
                        {children}
                    </h1>
                );
            },
            h2: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h2 id={slug} className="scroll-mt-20">
                        {children}
                    </h2>
                );
            },
            h3: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h3 id={slug} className="scroll-mt-20">
                        {children}
                    </h3>
                );
            },
            h4: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h4 id={slug} className="scroll-mt-20">
                        {children}
                    </h4>
                );
            },
            h5: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h5 id={slug} className="scroll-mt-20">
                        {children}
                    </h5>
                );
            },
            h6: ({
                children,
                value,
            }: {
                children?: React.ReactNode;
                value: any;
            }) => {
                const slug = createSlug(toPlainText(value));
                return (
                    <h6 id={slug} className="scroll-mt-20">
                        {children}
                    </h6>
                );
            },
        },
    };
    return <PortableText components={components} value={content} />;
}
