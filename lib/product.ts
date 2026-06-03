// Central product configuration for the downloadable tool.
// Amount is stored in pesewas (Paystack's smallest currency unit for GHS).
// Pricing is set in one place so the landing page, checkout, and admin stay in sync.
export const PRODUCT = {
  name: "Soybean Farm Budgeting & Planning Tool",
  shortName: "Soybean Budget Tool",
  fileName: "growforme-soybean-budgeting-tool.csv",
  currency: "GHS" as const,
  priceKobo: 100, // GHS 1.00
}

export function formatCedi(pesewas: number): string {
  const cedi = pesewas / 100
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: cedi % 1 === 0 ? 0 : 2,
  }).format(cedi)
}
