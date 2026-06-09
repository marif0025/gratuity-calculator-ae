interface HeroCalculatorProps {
    title: string;
    description: string;
}

export default function HeroCalculator({
    title,
    description,
}: HeroCalculatorProps) {
    return (
        <>
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-200 mb-4">{description}</p>
        </>
    );
}
