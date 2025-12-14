"use client";

import { TypedObject } from "sanity";
import Link from "next/link";
import { BookOpen, ChevronDown, ChevronUp, List } from "lucide-react";
import { HTMLAttributes, useState } from "react";

import { createSlug } from "@/lib/utils/slugify";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type TreeNode = {
    text: string;
    slug: string;
    children?: TreeNode[];
};

interface TableOfContentsProps extends HTMLAttributes<HTMLDivElement> {
    headings?: TypedObject[];
    title?: string;
    activeSection?: string | null;
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

type TRenderToc = React.HTMLAttributes<HTMLUListElement> & {
    elements: TreeNode[];
    level?: number;
    activeSection?: string | null;
}

function RenderToc({
    elements,
    level = 1,
    activeSection,
    className,
    ...props
}: TRenderToc) {
    // Helper to check if any descendant is active
    const hasActiveDescendant = (node: TreeNode): boolean => {
        if (node.slug === activeSection) return true;
        if (node.children) {
            return node.children.some((child) => hasActiveDescendant(child));
        }
        return false;
    };

    return (
        <ul
            role="list"
            {...props}
            className={cn("text-sm space-y-1", className, {
                "pl-2": level > 1,
            })}
        >
            {elements.map((el) => {
                const isActive = el.slug === activeSection;
                const hasActiveChild = el.children?.some((child) =>
                    hasActiveDescendant(child)
                );
                const shouldShowChildren = isActive || hasActiveChild;

                return (
                    <li key={el.text}>
                        <a
                            href={`#${el.slug}`}
                            className={cn(
                                "group relative flex items-start gap-2 px-3 py-2 text-sm transition-colors",
                                "hover:text-accent-foreground",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                level >= 3 && "text-muted-foreground", {
                                "bg-accent text-accent-foreground font-medium": hasActiveChild,
                                "font-medium": isActive,
                            }
                            )}
                            aria-current={isActive ? "location" : undefined}
                        >
                            <span className="leading-relaxed">{el.text}</span>
                        </a>

                        {el.children?.length ? (
                            <RenderToc
                                className={shouldShowChildren ? "" : "hidden"}
                                elements={el.children}
                                level={level + 1}
                                activeSection={activeSection}
                            />
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
}

function TableOfContentsComponent({
    headings,
    title = "Table of Contents",
    className,
    activeSection,
}: TableOfContentsProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!headings || headings.length === 0) return null;

    const nestedHeadings = nestHeadings(headings);

    return (
        <section
            className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
            aria-label={title}
        >
            <div
                role="button"
                tabIndex={0}
                onClick={() => setIsCollapsed(prev => !prev)}
                className="flex items-center justify-between border-b px-4 py-4 cursor-pointer hover:bg-accent rounded-t-lg"
            >
                <div className="flex items-center gap-2">
                    <List className="size-4 text-muted-foreground" aria-hidden="true" />
                    <h2 className="text-sm font-semibold">{title}</h2>
                </div>

                {isCollapsed ?
                    <ChevronDown className="size-4" /> :
                    <ChevronUp className="size-4" />
                }
            </div>

            {
                !isCollapsed && (
                    <ScrollArea
                        className="px-4 py-3 overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 12rem)" }}
                    >
                        <RenderToc elements={nestedHeadings} activeSection={activeSection} />
                    </ScrollArea>
                )
            }
        </section>
    );
}

export function TableOfContents({
    headings,
    activeSection,
}: TableOfContentsProps) {
    return (
        <TableOfContentsComponent
            headings={headings}
            activeSection={activeSection}
        />
    );
}
