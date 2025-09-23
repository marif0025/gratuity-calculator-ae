"use client";

import { FAQData, FAQsBlock } from "@/sanity/lib/types";
import {
    Accordion,
    AccordionContent,
    AccordionTrigger,
    AccordionItem,
} from "@/components/ui/accordion";
import { PortableTextComponent } from "@/components/portable-text/portable-text";

interface IPortableTextFAQs {
    value: FAQsBlock;
}

export function PortableTextFAQs({ value }: IPortableTextFAQs) {
    if (!value?.faqs || !Array.isArray(value.faqs)) return null;

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full border rounded-md shadow pb-1"
        >
            {value.faqs.map((faq: FAQData, index: number) => (
                <FAQItem key={`faq-${index + 1}`} faq={faq} index={index} />
            ))}
        </Accordion>
    );
}

function FAQItem({ faq, index }: { faq: FAQData; index: number }) {
    return (
        <AccordionItem
            value={`faq-${index + 1}`}
            className="[&>h3]:m-0 border-b last-of-type:border-b-0 hover:bg-accent data-[state=open]:bg-accent"
        >
            <AccordionTrigger className="text-left text-lg cursor-pointer px-5 rounded-none ">
                {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 [&>p]:m-0 px-5 [&>p]:text-base">
                <PortableTextComponent content={faq.answer} />
            </AccordionContent>
        </AccordionItem>
    );
}
