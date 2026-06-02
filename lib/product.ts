// Central product configuration for the downloadable tool.
// Amount is stored in kobo (Paystack's smallest currency unit for NGN).
// Pricing is set in one place so the landing page, checkout, and admin stay in sync.
export const PRODUCT = {
  name: "Soybean Farm Budgeting & Planning Tool",
  shortName: "Soybean Budget Tool",
  fileName: "growforme-soybean-budgeting-tool.csv",
  currency: "NGN" as const,
  priceKobo: 1500000, // ₦15,000.00
}

export function formatNaira(kobo: number): string {
  const naira = kobo / 100
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: naira % 1 === 0 ? 0 : 2,
  }).format(naira)
}
