"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Lock } from "lucide-react"

export function CheckoutDialog({
  priceLabel,
  triggerLabel = "Buy & Download",
  className,
  size = "lg",
  variant = "default",
}: {
  priceLabel: string
  triggerLabel?: string
  className?: string
  size?: "default" | "sm" | "lg"
  variant?: "default" | "secondary" | "outline"
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      // Redirect to Paystack's hosted checkout.
      window.location.href = data.authorizationUrl
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Complete your purchase</DialogTitle>
          <DialogDescription>
            Enter your details to pay {priceLabel} securely with Paystack. Your download link is
            sent to this email and shown right after payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="co-name">Full name</Label>
            <Input
              id="co-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Obi"
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="co-email">Email address</Label>
            <Input
              id="co-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={loading} className="mt-1 w-full">
            {loading ? (
              <>
                <Spinner /> Redirecting to Paystack...
              </>
            ) : (
              <>Pay {priceLabel}</>
            )}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3" />
            Secured by Paystack. We never see your card details.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
