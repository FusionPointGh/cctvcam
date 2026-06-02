import Link from "next/link"
import { Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <span className="font-serif text-lg font-semibold leading-none tracking-tight">
            GrowForMe
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#inside" className="transition-colors hover:text-foreground">
            What&apos;s inside
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>

        <Button asChild size="sm">
          <Link href="#pricing">Get the tool</Link>
        </Button>
      </div>
    </header>
  )
}
