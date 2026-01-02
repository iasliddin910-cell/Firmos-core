export type AgentSignal = {
  agent: string;
  type: "RISK" | "OPPORTUNITY" | "INFO";
  message: string;
  impactScore?: number;
  confidence?: number;
};

export type BrainDecision = {
  summary: string;
  signals: AgentSignal[];
  conflicts: string[];
  recommendation: string;
  requiresHumanApproval: boolean;
};

export class CompanyBrain {
  private signals: AgentSignal[] = [];

  receiveSignal(signal: AgentSignal) {
    this.signals.push(signal);
  }

  analyze(): BrainDecision {
    const conflicts: string[] = [];

    const hasHighRisk = this.signals.some(
      s => s.type === "RISK" && (s.impactScore ?? 0) > 7
    );

    if (hasHighRisk) {
      conflicts.push("High risk detected");
    }

    return {
      summary: `Received ${this.signals.length} signals`,
      signals: this.signals,
      conflicts,
      recommendation: hasHighRisk
        ? "Review risks before proceeding"
        : "Safe to consider next step",
      requiresHumanApproval: true
    };
  }

  reset() {
    this.signals = [];
  }
}
