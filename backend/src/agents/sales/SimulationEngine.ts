export type SimulationInput = {
  currentAvgOrderValue: number;
  monthlyOrders: number;
  priceChangePercent: number;
};

export type SimulationResult = {
  scenario: string;
  projectedRevenue: number;
  revenueChange: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
};

export function simulatePriceChange(
  input: SimulationInput
): SimulationResult {
  const currentRevenue =
    input.currentAvgOrderValue * input.monthlyOrders;

  const newAvgOrderValue =
    input.currentAvgOrderValue * (1 + input.priceChangePercent / 100);

  const projectedRevenue =
    newAvgOrderValue * input.monthlyOrders;

  const revenueChange = projectedRevenue - currentRevenue;

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (input.priceChangePercent >= 10) riskLevel = "HIGH";
  else if (input.priceChangePercent >= 5) riskLevel = "MEDIUM";

  return {
    scenario: `Price +${input.priceChangePercent}%`,
    projectedRevenue,
    revenueChange,
    riskLevel,
    explanation:
      "Simulation based on price elasticity assumption without behavioral change"
  };
}
