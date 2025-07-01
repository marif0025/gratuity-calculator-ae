import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function FAQ() {
  const faqs = [
    {
      question: "Who is eligible for gratuity in the UAE?",
      answer:
        "Any employee who has completed at least 1 year of continuous service with the same employer in the UAE is entitled to gratuity, as per MOHRE and UAE Labour Law.",
    },
    {
      question: "Is there a different gratuity rule for limited and unlimited contracts?",
      answer:
        "Yes. The gratuity payout varies based on resignation or termination under a limited or unlimited contract. Limited contracts may have reduced gratuity for early resignation, while unlimited contracts have different percentages based on service years.",
    },
    {
      question: "Is gratuity taxable in the UAE?",
      answer:
        "No, your end-of-service gratuity is tax-free in the UAE. However, your home country's tax laws may apply if you remit it abroad.",
    },
    {
      question: "Can I calculate gratuity after 5 or 10 years of service?",
      answer:
        "Absolutely. Our UAE Gratuity Calculator allows you to calculate gratuity for any service duration — including 3, 5, 10, or even 20+ years. After 5 years, you get 30 days per year instead of 21 days.",
    },
    {
      question: "Is this calculator valid for domestic workers and free zone employees?",
      answer:
        "Yes. It supports domestic workers, and employees in JAFZA, DMCC, DDA, and other free zones — all in line with UAE labor laws.",
    },
    {
      question: "What's the formula used in this calculator?",
      answer:
        "The tool uses the official UAE Gratuity Calculation Formula: 21 days' basic wage/year for the first 5 years, 30 days' wage/year for service beyond 5 years (Capped at two years' salary).",
    },
    {
      question: "What happens if I resign before completing my contract?",
      answer:
        "For limited contracts, early resignation may result in no gratuity or reduced gratuity depending on service years. For unlimited contracts, you get partial gratuity based on service duration: 33% for 1-3 years, 67% for 3-5 years, and full gratuity after 5 years.",
    },
    {
      question: "Is it safe and free to use this calculator?",
      answer:
        "100%! Our MOHRE-aligned gratuity calculator is free, secure, and doesn't require any login. No personal data is collected or stored.",
    },
  ]

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Get answers to common questions about UAE gratuity calculation</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Common Questions & Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
