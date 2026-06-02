import Link from "next/link"
import { Sprout } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <div>
            <p className="font-serif text-lg font-semibold leading-none">GrowForMe</p>
            <p className="mt-1 text-sm text-sidebar-foreground/70">Farm Services</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-sidebar-foreground/80">
          <Link href="#features" className="hover:text-sidebar-foreground">
            Features
          </Link>
          <Link href="#inside" className="hover:text-sidebar-foreground">
            What&apos;s inside
          </Link>
          <Link href="#pricing" className="hover:text-sidebar-foreground">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-sidebar-foreground">
            FAQ
          </Link>
        </nav>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-sidebar-foreground/60 sm:px-6">
          © {new Date().getFullYear()} GrowForMe Farm Services. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
