export type OpportunityContext = {
  avgOrderValue: number;
  returningCustomersRate: number;
};

export type OpportunityResult = {
  type: "UPSELL" | "RETENTION";
  potentialGain: number;
  confidence: number;
  explanation: string;
};

export function calculateOpportunities(
  context: OpportunityContext
): OpportunityResult[] {
  const results: OpportunityResult[] = [];

  if (context.avgOrderValue > 500) {
    results.push({
      type: "UPSELL",
      potentialGain: context.avgOrderValue * 0.1,
      confidence: 0.75,
      explanation: "High average order value indicates upsell potential"
    });
  }

  if (context.returningCustomersRate < 0.3) {
    results.push({
      type: "RETENTION",
      potentialGain: context.avgOrderValue * 0.2,
      confidence: 0.6,
      explanation: "Low retention suggests opportunity in repeat sales"
    });
  }

  return results;
}
