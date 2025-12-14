"use client";

import { BlogPostContent } from "./content";
import { TableOfContents } from "./table-of-contents";
import { BlogData } from "@/sanity/lib/types";
import { useActiveHeading } from "./use-active-heading";

interface IProps {
  blog: BlogData;
}

export function BlogContentWrap({ blog }: IProps) {
  const activeSection = useActiveHeading(blog.headings);

  return (
    <div className="grid lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-10">
      <aside className="sticky top-20 h-fit">
        <TableOfContents
          headings={blog.headings}
          activeSection={activeSection}
        />
      </aside>

      <BlogPostContent content={blog.content} />
    </div>
  )
}
