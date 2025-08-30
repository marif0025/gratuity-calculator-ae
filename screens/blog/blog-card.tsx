import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogPreview } from "@/sanity/lib/types";
import {
    Card,
    CardDescription,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Clock, Clock1 } from "lucide-react";

interface BlogCardProps {
    blog: BlogPreview;
}

export function BlogCard({ blog }: BlogCardProps) {
    const formattedDate = blog.publishedAt
        ? format(new Date(blog.publishedAt), "MMM dd, yyyy")
        : null;

    const data: FeaturedCardProps = {
        title: blog.title,
        description: blog.description || "",
        image: blog.featureImage?.url || "",
        date: formattedDate || "",
        category: blog.category.name,
        icon: <Clock1 />,
        slug: blog.slug.current,
    };

    return <FeaturedCard {...data} />;
}

interface FeaturedCardProps {
    title: string;
    description: string;
    image: string;
    date: string;
    category: string;
    icon: React.ReactNode;
    slug: string;
}

function FeaturedCard({
    title,
    description,
    image,
    date,
    category,
    icon,
    slug = "",
}: FeaturedCardProps) {
    return (
        <Card className="bg-gray-50 border-gray-100 overflow-hidden hover:border-purple-500/50 transition-colors pt-0">
            <div className="relative h-64">
                <Image
                    src={image || "/images/blog-hero-image-500x500.png"}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
                    {icon}
                    <span>{category}</span>
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-gray-400">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{date}</span>
                </div>
                <Link
                    href={`/blog/${slug}`}
                    className="text-purple-500 hover:text-purple-400"
                >
                    Read more →
                </Link>
            </CardFooter>
        </Card>
    );
}
