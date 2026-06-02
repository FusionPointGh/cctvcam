import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { WhatsInside } from "@/components/landing/whats-inside"
import { Pricing } from "@/components/landing/pricing"
import { Faq } from "@/components/landing/faq"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <WhatsInside />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
