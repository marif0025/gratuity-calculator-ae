import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";

import { urlForImage } from "@/sanity/lib/image";
import { Table } from "./ui/table";

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
            tableBlock: ({ value }: { value: any }) => {
                if (!value?.table) return null;

                return (
                    <Table
                        data={value.table}
                        title={value.title}
                        caption={value.caption}
                    />
                );
            },
        },
    };
    return <PortableText components={components} value={content} />;
}
