import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { Sprout, ShoppingCart, BadgeCheck, Wallet, Download } from "lucide-react"
import { auth } from "@/lib/auth"
import { getAdminUser } from "@/lib/admin"
import { getPurchaseStats, getPurchases, getRevenueByDay } from "@/app/actions/admin"
import { formatNaira } from "@/lib/product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { OrdersTable } from "@/components/admin/orders-table"
import { SignOutButton } from "@/components/admin/sign-out-button"

export default async function AdminPage() {
  // Must be signed in first.
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  // Signed in but not the admin -> show access denied.
  const admin = await getAdminUser()
  if (!admin) {
    return (
      <main className="flex min-h-svh items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="font-serif text-2xl font-semibold">Access restricted</h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            You are signed in as {session.user.email}, but this dashboard is limited to the store
            administrator.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/">Back to site</Link>
            </Button>
            <SignOutButton />
          </div>
        </div>
      </main>
    )
  }

  const [stats, purchases, revenueByDay] = await Promise.all([
    getPurchaseStats(),
    getPurchases(),
    getRevenueByDay(),
  ])

  const cards = [
    { label: "Total orders", value: String(stats.totalOrders), icon: ShoppingCart },
    { label: "Paid orders", value: String(stats.paidOrders), icon: BadgeCheck },
    { label: "Revenue", value: formatNaira(stats.revenue), icon: Wallet },
    { label: "Downloads", value: String(stats.downloads), icon: Download },
  ]

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sprout className="size-5" />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold leading-none">GrowForMe</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Admin dashboard</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {admin.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Sales and downloads for the {`Soybean Budgeting Tool`}.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </CardTitle>
                <c.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="font-serif text-2xl font-semibold tabular-nums">{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Revenue over time</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueByDay} />
          </CardContent>
        </Card>

        <div className="mt-6">
          <h2 className="font-serif text-xl font-semibold">Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Most recent {purchases.length} orders.
          </p>
          <div className="mt-4">
            <OrdersTable purchases={purchases} />
          </div>
        </div>
      </main>
    </div>
  )
}
