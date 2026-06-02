import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatNaira } from "@/lib/product"

type Purchase = {
  id: number
  customerName: string
  email: string
  reference: string
  amount: number
  status: string
  downloadCount: number
  createdAt: Date | string
}

function StatusBadge({ status }: { status: string }) {
  if (status === "success") {
    return <Badge className="bg-primary text-primary-foreground">Paid</Badge>
  }
  if (status === "failed") {
    return <Badge variant="destructive">Failed</Badge>
  }
  return <Badge variant="secondary">Pending</Badge>
}

export function OrdersTable({ purchases }: { purchases: Purchase[] }) {
  if (purchases.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        No orders yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Downloads</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.customerName}</TableCell>
              <TableCell className="text-muted-foreground">{p.email}</TableCell>
              <TableCell>
                <StatusBadge status={p.status} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNaira(p.amount)}
              </TableCell>
              <TableCell className="text-right tabular-nums">{p.downloadCount}</TableCell>
              <TableCell className="text-right text-muted-foreground">
                {new Date(p.createdAt).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
