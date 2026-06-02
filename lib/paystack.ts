// Server-only Paystack helpers. Never import this in client components.
const PAYSTACK_BASE = "https://api.paystack.co"

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set")
  return key
}

export type InitializeResponse = {
  authorization_url: string
  access_code: string
  reference: string
}

export async function initializeTransaction(params: {
  email: string
  amount: number // in kobo
  reference: string
  callbackUrl: string
  metadata?: Record<string, unknown>
}): Promise<InitializeResponse> {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  })

  const json = await res.json()
  if (!res.ok || !json.status) {
    throw new Error(json.message ?? "Failed to initialize transaction")
  }
  return json.data as InitializeResponse
}

export type VerifyResponse = {
  status: string // "success" | "failed" | ...
  reference: string
  amount: number
  currency: string
  paid_at: string | null
  customer: { email: string }
}

export async function verifyTransaction(
  reference: string,
): Promise<VerifyResponse> {
  const res = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey()}` },
      cache: "no-store",
    },
  )
  const json = await res.json()
  if (!res.ok || !json.status) {
    throw new Error(json.message ?? "Failed to verify transaction")
  }
  return json.data as VerifyResponse
}
