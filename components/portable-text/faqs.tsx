"use client";

import { FAQData, FAQsBlock } from "@/sanity/lib/types";
import {
    Accordion,
    AccordionContent,
    AccordionTrigger,
    AccordionItem,
} from "@/components/ui/accordion";
import { PortableTextComponent } from "@/components/portable-text/portable-text";
import { JsonLd } from "@/components/seo/json-ld";
import { renderJsonLd } from "@/lib/seo/jsonld";
import { extractPlainTextFromPortableText } from "@/lib/sanity/portable-text-utils";
import type { WithContext, FAQPage } from "schema-dts";

interface IPortableTextFAQs {
    value: FAQsBlock;
}

export function PortableTextFAQs({ value }: IPortableTextFAQs) {
    if (!value?.faqs || !Array.isArray(value.faqs)) return null;

    // Generate FAQPage schema
    const faqMainEntity = value.faqs
        .map(faq => ({
            question: faq.question,
            answer: extractPlainTextFromPortableText(faq.answer),
        }))
        .filter(faq => faq.question && faq.answer);

    const faqSchema: WithContext<FAQPage> | null = faqMainEntity.length > 0
        ? (JSON.parse(renderJsonLd.faqPage({ mainEntity: faqMainEntity })) as WithContext<FAQPage>)
        : null;

    return (
        <>
            {faqSchema && <JsonLd data={faqSchema} id="portable-text-faq-schema" />}
            <Accordion
                type="single"
                collapsible
                className="w-full border rounded-md shadow pb-1"
            >
                {value.faqs.map((faq: FAQData, index: number) => (
                    <FAQItem key={`faq-${index + 1}`} faq={faq} index={index} />
                ))}
            </Accordion>
        </>
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
