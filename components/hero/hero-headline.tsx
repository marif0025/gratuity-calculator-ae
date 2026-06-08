interface HeroHeadlineProps {
    title: string;
    subtitle: string;
    description: string;
    highlightedText: string;
    tagline?: string;
}

export default function HeroHeadline({
    title,
    subtitle,
    description,
    highlightedText,
    tagline,
}: HeroHeadlineProps) {
    return (
        <div className="space-y-4 mb-6 lg:mb-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    {highlightedText}
                </span>
                <span className="block">{subtitle}</span>
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                {description}
                {tagline && (
                    <span className="font-semibold text-white">{tagline}</span>
                )}
            </p>
        </div>
    );
}
