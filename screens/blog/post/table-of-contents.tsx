"use client";

import { TypedObject } from "sanity";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { HTMLAttributes, useState } from "react";

import { createSlug } from "@/lib/utils/slugify";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TreeNode = {
    text: string;
    slug: string;
    children?: TreeNode[];
};

interface TableOfContentsProps extends HTMLAttributes<HTMLDivElement> {
    headings?: TypedObject[];
    title?: string;
}

export function nestHeadings(blocks: TypedObject[]): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    const stack: { node: TreeNode; level: number }[] = [];

    blocks.forEach((block: any) => {
        if (!block.style || !block.children) return;

        const level = parseInt(block.style.replace("h", ""), 10);
        const text =
            block.children.map((child: any) => child.text || "").join(" ") ||
            "Untitled";

        const treeNode: TreeNode = {
            slug: createSlug(text),
            text,
            children: [],
        };

        while (stack.length > 0) {
            const topStack = stack[stack.length - 1];
            if (topStack && topStack.level < level) break;
            stack.pop();
        }

        if (stack.length > 0) {
            const parentNode = stack[stack.length - 1]?.node;
            if (parentNode && !parentNode.children) {
                parentNode.children = [];
            }
            parentNode?.children?.push(treeNode);
        } else {
            treeNodes.push(treeNode);
        }

        stack.push({ node: treeNode, level });
    });

    return treeNodes;
}

function RenderToc({
    elements,
    level = 1,
}: {
    elements: TreeNode[];
    level?: number;
}) {
    return (
        <ul
            className={`space-y-2 text-sm font-semibold ${
                level > 1
                    ? "ml-4 list-disc space-y-1 font-normal"
                    : "space-y-3.5 border-l pl-4"
            }`}
        >
            {elements.map((el) => (
                <li
                    key={el.text}
                    className={level > 1 ? "[&:first-child]:mt-2" : ""}
                >
                    <Link
                        href={`#${el.slug}`}
                        className="hover:underline hover:underline-offset-4 transition-colors"
                    >
                        {el.text}
                    </Link>
                    {el.children && (
                        <RenderToc elements={el.children} level={level + 1} />
                    )}
                </li>
            ))}
        </ul>
    );
}

function TableOfContentsComponent({
    headings,
    title = "Table of Contents",
    className,
}: TableOfContentsProps) {
    if (!headings || headings.length === 0) {
        return null;
    }

    const nestedHeadings = nestHeadings(headings);

    return (
        <section className={cn("flex max-w-sm flex-col", className)}>
            <h3 className="z-0 hidden lg:block mb-4 pb-1.5 font-bold md:sticky md:top-0">
                {title}
            </h3>
            <nav className="flex gap-4">
                <RenderToc elements={nestedHeadings} />
            </nav>
        </section>
    );
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [showToc, setShowToc] = useState(false);
    return (
        <>
            <Button
                className="lg:hidden"
                onClick={() => setShowToc((prev) => !prev)}
            >
                <BookOpen className="w-4 h-4" />
                <span>Table of Contents</span>
            </Button>

            <TableOfContentsComponent
                headings={headings}
                className={cn("hidden lg:block", {
                    "block pt-8": showToc,
                })}
            />
        </>
    );
}
