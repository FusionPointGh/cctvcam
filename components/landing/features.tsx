import {
  Calculator,
  LineChart,
  CalendarDays,
  PiggyBank,
  Sprout,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    icon: Calculator,
    title: "Itemized cost budgeting",
    desc: "Capture every input — seed, fertilizer, herbicide, labour, harvest — with per-hectare and whole-farm totals calculated for you.",
  },
  {
    icon: LineChart,
    title: "Profit & ROI forecasting",
    desc: "Instantly see gross revenue, net profit, profit per hectare, and return on investment as you adjust your figures.",
  },
  {
    icon: PiggyBank,
    title: "Break-even analysis",
    desc: "Know the exact yield and price you need to cover costs, so you can plan around risk instead of guessing.",
  },
  {
    icon: CalendarDays,
    title: "Production calendar",
    desc: "A month-by-month schedule from land prep to storage keeps your operations on track all season.",
  },
  {
    icon: Sprout,
    title: "Soybean-specific defaults",
    desc: "Pre-filled with realistic soybean benchmarks you can keep or override to match your own farm.",
  },
  {
    icon: ShieldCheck,
    title: "Yours forever",
    desc: "A one-time payment gets you the file to reuse season after season. No subscriptions, no logins to farm.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Everything in one file
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for real soybean farm decisions
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            No more scattered notes or back-of-the-envelope math. This tool turns your farm plan
            into clear numbers you can act on.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
