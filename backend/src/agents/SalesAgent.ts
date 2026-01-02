import { CompanyBrain, AgentSignal } from "../core/CompanyBrain";

export type SalesContext = {
  dailyOrders: number;
  cancelledOrders: number;
  unpaidOrders: number;
  avgOrderValue: number;
};

export class SalesAgent {
  private brain: CompanyBrain;

  constructor(brain: CompanyBrain) {
    this.brain = brain;
  }

  analyze(context: SalesContext) {
    const signals: AgentSignal[] = [];

    if (context.cancelledOrders > 5) {
      signals.push({
        agent: "SalesAgent",
        type: "RISK",
        message: "High number of cancelled orders",
        impactScore: 8,
        confidence: 0.7
      });
    }

    if (context.unpaidOrders > 3) {
      signals.push({
        agent: "SalesAgent",
        type: "RISK",
        message: "Multiple unpaid orders detected",
        impactScore: 6,
        confidence: 0.6
      });
    }

    if (context.avgOrderValue > 500) {
      signals.push({
        agent: "SalesAgent",
        type: "OPPORTUNITY",
        message: "High average order value — upsell potential",
        impactScore: 7,
        confidence: 0.8
      });
    }

    signals.forEach(signal => this.brain.receiveSignal(signal));
  }
}
