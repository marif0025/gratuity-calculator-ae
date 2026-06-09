import { cn } from "@/lib/utils";
import styles from "./hero-headline.module.css";

interface HeroHeadlineProps {
    title: string;
    description: string;
}

export default function HeroHeadline({ title, description }: HeroHeadlineProps) {
    return (
        <div className={cn("space-y-4 mb-6 lg:mb-8")}>
            <h1
                className={cn(styles.title)}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
                className={cn(styles.description)}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}
