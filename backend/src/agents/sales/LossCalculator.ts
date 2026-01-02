export type LossContext = {
  cancelledOrders: number;
  unpaidOrders: number;
  avgOrderValue: number;
};

export type LossResult = {
  type: "CANCELLATION" | "UNPAID";
  estimatedLoss: number;
  reason: string;
  riskScore: number;
};

export function calculateLoss(context: LossContext): LossResult[] {
  const results: LossResult[] = [];

  if (context.cancelledOrders > 0) {
    results.push({
      type: "CANCELLATION",
      estimatedLoss: context.cancelledOrders * context.avgOrderValue,
      reason: "Cancelled orders reduce realized revenue",
      riskScore: Math.min(10, context.cancelledOrders)
    });
  }

  if (context.unpaidOrders > 0) {
    results.push({
      type: "UNPAID",
      estimatedLoss: context.unpaidOrders * context.avgOrderValue,
      reason: "Unpaid orders create cashflow risk",
      riskScore: Math.min(10, context.unpaidOrders + 3)
    });
  }

  return results;
}
