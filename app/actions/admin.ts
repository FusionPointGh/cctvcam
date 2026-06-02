"use server"

import { desc, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { purchase } from "@/lib/db/schema"
import { getAdminUser } from "@/lib/admin"

async function requireAdmin() {
  const admin = await getAdminUser()
  if (!admin) throw new Error("Unauthorized")
  return admin
}

export async function getPurchaseStats() {
  await requireAdmin()
  const [row] = await db
    .select({
      totalOrders: sql<number>`count(*)`,
      paidOrders: sql<number>`count(*) filter (where ${purchase.status} = 'success')`,
      revenue: sql<number>`coalesce(sum(${purchase.amount}) filter (where ${purchase.status} = 'success'), 0)`,
      downloads: sql<number>`coalesce(sum(${purchase.downloadCount}), 0)`,
    })
    .from(purchase)

  return {
    totalOrders: Number(row?.totalOrders ?? 0),
    paidOrders: Number(row?.paidOrders ?? 0),
    revenue: Number(row?.revenue ?? 0),
    downloads: Number(row?.downloads ?? 0),
  }
}

export async function getPurchases() {
  await requireAdmin()
  return db.select().from(purchase).orderBy(desc(purchase.createdAt)).limit(200)
}

export async function getRevenueByDay() {
  await requireAdmin()
  const rows = await db
    .select({
      day: sql<string>`to_char(date_trunc('day', ${purchase.createdAt}), 'YYYY-MM-DD')`,
      revenue: sql<number>`coalesce(sum(${purchase.amount}) filter (where ${purchase.status} = 'success'), 0)`,
    })
    .from(purchase)
    .groupBy(sql`date_trunc('day', ${purchase.createdAt})`)
    .orderBy(sql`date_trunc('day', ${purchase.createdAt})`)

  return rows.map((r) => ({
    day: r.day,
    revenue: Number(r.revenue) / 100, // naira
  }))
}
