import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PortableTextComponent } from "./portable-text";
import { FAQData } from "@/sanity/lib/types";

interface FAQSectionProps {
    faqs: FAQData[];
    title?: string;
    description?: string;
}

export function FAQSection({ faqs, title, description }: FAQSectionProps) {
    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            {(title || description) && (
                <div className="text-center mb-8">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={faq._key || index}
                            value={`faq-${index}`}
                        >
                            <AccordionTrigger className="text-left font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700">
                                <PortableTextComponent content={faq.answer} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
