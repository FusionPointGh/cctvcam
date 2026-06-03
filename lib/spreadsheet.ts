// Generates the actual downloadable Soybean Farm Budgeting & Planning tool
// as a CSV (opens in Excel, Google Sheets, LibreOffice). This is generated
// server-side and only served through a paid, token-gated download route.
export function buildSoybeanBudgetCsv(): string {
  const rows: string[][] = [
    ["GROWFORME FARM SERVICES — SOYBEAN FARM BUDGETING & PLANNING TOOL"],
    ["Enter your figures in the 'Amount' / 'Qty' columns. Totals update in your spreadsheet app."],
    [],
    ["1. FARM SETUP"],
    ["Item", "Value", "Unit"],
    ["Farm size", "10", "hectares"],
    ["Expected yield per hectare", "2.5", "tonnes"],
    ["Target market price", "2500", "GHS/tonne"],
    [],
    ["2. VARIABLE COSTS (per hectare)", "", ""],
    ["Cost item", "Qty", "Unit cost (GHS)", "Total (GHS)"],
    ["Land preparation (ploughing/harrowing)", "1", "45000", "=B12*C12"],
    ["Certified soybean seed (kg)", "60", "1200", "=B13*C13"],
    ["Seed inoculant", "1", "8000", "=B14*C14"],
    ["Basal fertilizer - SSP (bags)", "2", "28000", "=B15*C15"],
    ["Top dressing fertilizer (bags)", "1", "30000", "=B16*C16"],
    ["Pre-emergence herbicide (L)", "3", "5500", "=B17*C17"],
    ["Post-emergence herbicide (L)", "2", "7000", "=B18*C18"],
    ["Insecticide / fungicide", "2", "6500", "=B19*C19"],
    ["Planting labour (man-days)", "8", "4000", "=B20*C20"],
    ["Weeding labour (man-days)", "10", "4000", "=B21*C21"],
    ["Harvesting & threshing", "1", "60000", "=B22*C22"],
    ["Bagging & transport", "1", "35000", "=B23*C23"],
    ["Subtotal variable cost / ha", "", "", "=SUM(D12:D23)"],
    [],
    ["3. FIXED & OVERHEAD COSTS (whole farm)", "", ""],
    ["Cost item", "", "", "Total (GHS)"],
    ["Land rent", "", "", "150000"],
    ["Equipment / tool depreciation", "", "", "80000"],
    ["Storage", "", "", "50000"],
    ["Miscellaneous / contingency", "", "", "70000"],
    ["Subtotal fixed cost", "", "", "=SUM(D29:D32)"],
    [],
    ["4. COST SUMMARY", "", ""],
    ["Description", "", "", "Total (GHS)"],
    ["Total variable cost (size x per-ha)", "", "", "=D24*B6"],
    ["Total fixed cost", "", "", "=D33"],
    ["TOTAL PRODUCTION COST", "", "", "=D38+D39"],
    [],
    ["5. REVENUE & PROFIT", "", ""],
    ["Description", "", "", "Total (GHS)"],
    ["Total expected output (tonnes)", "", "", "=B6*B7"],
    ["Gross revenue", "", "", "=D44*B8"],
    ["Net profit", "", "", "=D45-D40"],
    ["Profit per hectare", "", "", "=D46/B6"],
    ["Return on investment (%)", "", "", "=(D46/D40)*100"],
    ["Break-even yield per hectare (tonnes)", "", "", "=D40/(B8*B6)"],
    [],
    ["6. PRODUCTION CALENDAR", "", ""],
    ["Activity", "Month", "Notes"],
    ["Land preparation", "April", "Clear and plough before rains"],
    ["Planting", "May", "Plant with onset of steady rains"],
    ["First weeding", "June", "2-3 weeks after planting"],
    ["Fertilizer top dressing", "June", "After first weeding"],
    ["Pest & disease scouting", "July", "Weekly inspection"],
    ["Second weeding", "July", "As needed"],
    ["Harvesting", "September", "When 95% of pods are brown"],
    ["Threshing & storage", "October", "Dry to 12% moisture before storage"],
    [],
    ["Prepared by GrowForMe Farm Services — growforme.com"],
  ]

  return rows
    .map((cols) =>
      cols
        .map((cell) => {
          const v = String(cell ?? "")
          // Quote cells that contain commas, quotes, or newlines.
          if (/[",\n]/.test(v)) {
            return `"${v.replace(/"/g, '""')}"`
          }
          return v
        })
        .join(","),
    )
    .join("\r\n")
}
