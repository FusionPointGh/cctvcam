import Link from "next/link"
import { eq } from "drizzle-orm"
import { CheckCircle2, XCircle, Download, ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { purchase } from "@/lib/db/schema"
import { verifyTransaction } from "@/lib/paystack"
import { PRODUCT, formatNaira } from "@/lib/product"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

type Status = "success" | "failed" | "missing"

async function resolvePayment(reference?: string): Promise<{
  status: Status
  downloadToken?: string
  name?: string
}> {
  if (!reference) return { status: "missing" }

  const rows = await db
    .select()
    .from(purchase)
    .where(eq(purchase.reference, reference))
    .limit(1)
  const record = rows[0]
  if (!record) return { status: "missing" }

  // If already verified, don't re-hit Paystack.
  if (record.status === "success") {
    return { status: "success", downloadToken: record.downloadToken, name: record.customerName }
  }

  try {
    const data = await verifyTransaction(reference)
    if (data.status === "success") {
      await db
        .update(purchase)
        .set({ status: "success", paidAt: new Date() })
        .where(eq(purchase.id, record.id))
      return { status: "success", downloadToken: record.downloadToken, name: record.customerName }
    }
    await db.update(purchase).set({ status: "failed" }).where(eq(purchase.id, record.id))
    return { status: "failed" }
  } catch (err) {
    console.log("[v0] verify error:", err instanceof Error ? err.message : err)
    return { status: "failed" }
  }
}

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>
}) {
  const params = await searchParams
  const reference = params.reference ?? params.trxref
  const result = await resolvePayment(reference)

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          {result.status === "success" ? (
            <>
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-8" />
              </span>
              <h1 className="mt-5 font-serif text-2xl font-semibold">Payment successful</h1>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {result.name ? `Thank you, ${result.name}. ` : "Thank you. "}
                Your {PRODUCT.shortName} is ready to download.
              </p>
              <Button asChild size="lg" className="mt-6 w-full">
                <a href={`/api/download/${result.downloadToken}`}>
                  <Download className="size-4" />
                  Download the tool
                </a>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Keep this page bookmarked — you can re-download from this link anytime.
              </p>
            </>
          ) : (
            <>
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <XCircle className="size-8" />
              </span>
              <h1 className="mt-5 font-serif text-2xl font-semibold">
                {result.status === "missing" ? "Payment not found" : "Payment not completed"}
              </h1>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {result.status === "missing"
                  ? "We couldn't find this transaction. If you were charged, contact support."
                  : "Your payment was not successful and you have not been charged. Please try again."}
              </p>
              <Button asChild variant="outline" size="lg" className="mt-6 w-full">
                <Link href="/#pricing">
                  <ArrowLeft className="size-4" />
                  Back to checkout
                </Link>
              </Button>
            </>
          )}
          <p className="mt-6 text-xs text-muted-foreground">
            Order total: {formatNaira(PRODUCT.priceKobo)}
          </p>
        </div>
      </main>
    </div>
  )
}
