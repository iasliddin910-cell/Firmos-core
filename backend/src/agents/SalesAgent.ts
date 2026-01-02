import {
  simulatePriceChange,
  SimulationInput,
  SimulationResult
} from "./SimulationEngine";

import { calculateLoss } from "./LossCalculator";
import { calculateOpportunity } from "./OpportunityCalculator";

export type SalesSignal = {
  type: "LOSS" | "OPPORTUNITY" | "SIMULATION";
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  details: string;
  data?: any;
};

export class SalesAgent {
  analyze(data: {
    avgOrderValue: number;
    monthlyOrders: number;
    cancelRate: number;
  }): SalesSignal[] {
    const signals: SalesSignal[] = [];

    // 1️⃣ Yo‘qotilgan foyda
    const loss = calculateLoss(
      data.avgOrderValue,
      data.monthlyOrders,
      data.cancelRate
    );

    if (loss.amount > 0) {
      signals.push({
        type: "LOSS",
        severity: loss.severity,
        title: "Yo‘qotilgan foyda aniqlandi",
        details: `Bekor qilish sababli taxminiy yo‘qotish: ${loss.amount}`,
        data: loss
      });
    }

    // 2️⃣ Yangi imkoniyat
    const opportunity = calculateOpportunity(
      data.avgOrderValue,
      data.monthlyOrders
    );

    if (opportunity.amount > 0) {
      signals.push({
        type: "OPPORTUNITY",
        severity: opportunity.severity,
        title: "Daromad oshirish imkoniyati",
        details: `Potensial qo‘shimcha foyda: ${opportunity.amount}`,
        data: opportunity
      });
    }

    // 3️⃣ SIMULYATSIYA (qarordan oldin)
    const simulationInput: SimulationInput = {
      currentAvgOrderValue: data.avgOrderValue,
      monthlyOrders: data.monthlyOrders,
      priceChangePercent: 5
    };

    const simulation: SimulationResult =
      simulatePriceChange(simulationInput);

    signals.push({
      type: "SIMULATION",
      severity: simulation.riskLevel,
      title: "Narx o‘zgarishi simulyatsiyasi",
      details: `Agar narx +5% bo‘lsa: ${
        simulation.revenueChange > 0 ? "+" : ""
      }${simulation.revenueChange}`,
      data: simulation
    });

    return signals;
  }
}
