import Image from "next/image"
import { CheckCircle2, Download, FileSpreadsheet } from "lucide-react"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { formatNaira, PRODUCT } from "@/lib/product"

export function Hero() {
  const price = formatNaira(PRODUCT.priceKobo)
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <FileSpreadsheet className="size-3.5 text-primary" />
            For soybean farmers & agribusiness planners
          </span>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Plan a profitable soybean farm before you plant a single seed.
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            The GrowForMe Soybean Budgeting &amp; Planning Tool is a ready-made spreadsheet that
            calculates your costs, forecasts your yield, and projects your profit per hectare in
            minutes. Buy once, download instantly.
          </p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CheckoutDialog priceLabel={price} triggerLabel={`Buy & download — ${price}`} />
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Download className="size-4" />
              Instant download after payment
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            {["Works in Excel & Google Sheets", "Pre-built formulas", "One-time payment"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border shadow-2xl shadow-primary/10">
            <Image
              src="/soybean-field.png"
              alt="Healthy soybean field at golden hour"
              width={720}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-border bg-card p-4 shadow-xl sm:block">
            <p className="text-xs text-muted-foreground">Projected net profit / ha</p>
            <p className="font-serif text-2xl font-semibold text-primary">₦612,500</p>
          </div>
        </div>
      </div>
    </section>
  )
}
