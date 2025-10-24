"use client";

import { HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeFaqs } from "@/sanity/lib/types";
import { PortableTextComponent } from "./portable-text";

interface FAQProps {
    content: HomeFaqs;
}

export function FAQ({ content }: FAQProps) {
    return (
        <section id="faq" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        {content.title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {content.title}
                            </h2>
                        )}
                        {content.description && (
                            <p className="text-lg text-gray-600">
                                {content.description}
                            </p>
                        )}
                    </div>

                    {content.faqs && content.faqs.length ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5" />
                                    Common Questions & Answers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    {content.faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                        >
                                            <AccordionTrigger className="text-left">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-700">
                                                <PortableTextComponent
                                                    content={faq.answer}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
