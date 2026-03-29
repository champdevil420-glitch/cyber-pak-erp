// FBR Tax Slabs for 2025-2026 Fiscal Year (Pakistan)
export const FBR_SLABS = [
  { min: 0, max: 600000, base: 0, rate: 0 },
  { min: 600000, max: 1200000, base: 0, rate: 0.05 },
  { min: 1200000, max: 2200000, base: 30000, rate: 0.15 },
  { min: 2200000, max: 3200000, base: 180000, rate: 0.25 },
  { min: 3200000, max: 4100000, base: 430000, rate: 0.30 },
  { min: 4100000, max: Infinity, base: 700000, rate: 0.35 },
];

/**
 * Calculates monthly income tax based on annual slabs
 * @param monthlySalary The gross salary per month
 */
export function calculateIncomeTax(monthlySalary: number): number {
  const annual = monthlySalary * 12;
  const slab = FBR_SLABS.find(s => annual > s.min && annual <= (s.max || Infinity));
  
  if (!slab) return 0;
  
  const annualTax = slab.base + (annual - slab.min) * slab.rate;
  return Math.round(annualTax / 12); // Returns monthly tax
}