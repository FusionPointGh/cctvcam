import { type NextRequest, NextResponse } from "next/server"
import { eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { purchase } from "@/lib/db/schema"
import { PRODUCT } from "@/lib/product"
import { buildSoybeanBudgetCsv } from "@/lib/spreadsheet"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params

  const rows = await db
    .select()
    .from(purchase)
    .where(eq(purchase.downloadToken, token))
    .limit(1)

  const record = rows[0]
  if (!record || record.status !== "success") {
    return NextResponse.json(
      { error: "Invalid or unpaid download link." },
      { status: 403 },
    )
  }

  // Track how many times the file has been downloaded.
  await db
    .update(purchase)
    .set({ downloadCount: sql`${purchase.downloadCount} + 1` })
    .where(eq(purchase.id, record.id))

  const csv = buildSoybeanBudgetCsv()

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${PRODUCT.fileName}"`,
      "Cache-Control": "no-store",
    },
  })
}
