"use client";

import { HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HomeFaqs } from "@/sanity/lib/types";
import { PortableTextComponent } from "./portable-text";

interface FAQProps {
    content: HomeFaqs;
}

export function FAQ({ content }: FAQProps) {
    return (
        <section id="faq" className="py-16 bg-white">
            <div className="w-full max-w-4xl mx-auto px-4">
                {content.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4  text-center">
                        {content.title}
                    </h2>
                )}
                {content.description && (
                    <p className="text-lg text-gray-600  text-center">
                        {content.description}
                    </p>
                )}

                {content.faqs && content.faqs.length ? (
                    <Card className="gap-0 mt-12">
                        <div className="flex items-center gap-3 px-6 mb-3">
                            <HelpCircle className="size-6" />
                            <h2 className="text-2xl font-semibold">Common Questions & Answers</h2>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                        >
                            {content.faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="px-3 hover:bg-gray-100 border-b last-of-type:border-b-0 data-[state=open]:bg-gray-100"
                                >
                                    <AccordionTrigger className="text-left text-lg cursor-pointer p-5 rounded-none ">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="prose max-w-none px-5">
                                        <PortableTextComponent
                                            content={faq.answer}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                ) : null}
            </div>
        </section>
    );
}
