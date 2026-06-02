import Image from "next/image"
import { Check } from "lucide-react"

const sheets = [
  "Farm setup & assumptions (size, yield, price)",
  "Variable cost worksheet (seed, fertilizer, chemicals, labour)",
  "Fixed & overhead cost worksheet",
  "Automatic cost summary",
  "Revenue, net profit & ROI calculator",
  "Break-even yield calculator",
  "Month-by-month production calendar",
]

export function WhatsInside() {
  return (
    <section id="inside" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border shadow-xl">
            <Image
              src="/soybean-pods.png"
              alt="Close-up of ripe soybean pods"
              width={640}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            What you get
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            One spreadsheet, seven connected worksheets
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Download a single file that opens in Microsoft Excel, Google Sheets, or LibreOffice.
            Every section is linked with formulas, so changing one number updates your whole plan.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {sheets.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
