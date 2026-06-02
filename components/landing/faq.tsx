import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "What format is the tool delivered in?",
    a: "It is a spreadsheet file (CSV) that opens directly in Microsoft Excel, Google Sheets, and LibreOffice Calc. The cost and profit sections use formulas so totals calculate automatically.",
  },
  {
    q: "How do I receive it after paying?",
    a: "As soon as your payment is confirmed by Paystack, you are taken to a download page with your file. A download link is also tied to your email so you can come back to it.",
  },
  {
    q: "Is this a one-time payment or a subscription?",
    a: "It is a single one-time payment. Once you buy it, the tool is yours to reuse season after season — there are no recurring charges.",
  },
  {
    q: "Can I edit the numbers for my own farm?",
    a: "Yes. The spreadsheet comes pre-filled with realistic soybean benchmarks, but every input — farm size, prices, quantities, and costs — can be changed to match your own operation.",
  },
  {
    q: "What payment methods are supported?",
    a: "Payments are processed securely by Paystack, which supports debit/credit cards, bank transfers, and USSD. We never see or store your card details.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">FAQ</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
