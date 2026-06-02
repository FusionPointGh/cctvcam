import { Check } from "lucide-react"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { formatNaira, PRODUCT } from "@/lib/product"

const included = [
  "The complete soybean budgeting spreadsheet",
  "All 7 linked worksheets with formulas",
  "Production calendar template",
  "Works in Excel, Google Sheets & LibreOffice",
  "Instant download + email link",
  "Lifetime access — reuse every season",
]

export function Pricing() {
  const price = formatNaira(PRODUCT.priceKobo)
  return (
    <section id="pricing" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Pricing</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            One simple price. Yours to keep.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            No subscriptions. Pay once and download the tool immediately.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          <div className="border-b border-border bg-primary px-8 py-8 text-center text-primary-foreground">
            <p className="font-serif text-lg">{PRODUCT.name}</p>
            <p className="mt-3 font-serif text-5xl font-semibold">{price}</p>
            <p className="mt-1 text-sm opacity-80">one-time payment</p>
          </div>
          <div className="px-8 py-8">
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CheckoutDialog
                priceLabel={price}
                triggerLabel={`Buy & download — ${price}`}
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure payment by Paystack. Cards, bank transfer & USSD supported.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
