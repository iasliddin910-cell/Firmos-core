import { CompanyBrain } from "../core/CompanyBrain";
import { calculateLoss } from "./sales/LossCalculator";
import { calculateOpportunities } from "./sales/OpportunityCalculator";

export type SalesContext = {
  cancelledOrders: number;
  unpaidOrders: number;
  avgOrderValue: number;
  returningCustomersRate: number;
};

export class SalesAgent {
  constructor(private brain: CompanyBrain) {}

  analyze(context: SalesContext) {
    const losses = calculateLoss({
      cancelledOrders: context.cancelledOrders,
      unpaidOrders: context.unpaidOrders,
      avgOrderValue: context.avgOrderValue
    });

    losses.forEach(loss => {
      this.brain.receiveSignal({
        agent: "SalesAgent",
        type: "RISK",
        message: loss.reason,
        impactScore: loss.riskScore,
        confidence: 0.7
      });
    });

    const opportunities = calculateOpportunities({
      avgOrderValue: context.avgOrderValue,
      returningCustomersRate: context.returningCustomersRate
    });

    opportunities.forEach(op => {
      this.brain.receiveSignal({
        agent: "SalesAgent",
        type: "OPPORTUNITY",
        message: op.explanation,
        impactScore: Math.round(op.potentialGain / 100),
        confidence: op.confidence
      });
    });
  }
}
