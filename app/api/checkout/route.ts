import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { db } from "@/lib/db"
import { purchase } from "@/lib/db/schema"
import { PRODUCT } from "@/lib/product"
import { initializeTransaction } from "@/lib/paystack"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase()

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    const reference = `GFM-${randomUUID()}`
    const downloadToken = randomUUID()

    // Build the callback URL from the incoming request origin.
    const origin = req.nextUrl.origin
    const callbackUrl = `${origin}/payment/callback`

    const init = await initializeTransaction({
      email,
      amount: PRODUCT.priceKobo,
      reference,
      callbackUrl,
      metadata: { product: PRODUCT.name, customerName: name },
    })

    await db.insert(purchase).values({
      customerName: name,
      email,
      reference,
      amount: PRODUCT.priceKobo,
      currency: PRODUCT.currency,
      status: "pending",
      downloadToken,
    })

    return NextResponse.json({ authorizationUrl: init.authorization_url })
  } catch (err) {
    console.log("[v0] checkout error:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    )
  }
}
