export type TaxSignal = {
  type: "RISK" | "OPTIMIZATION";
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  explanation: string;
};

export class TaxAgent {
  analyze(data: {
    monthlyRevenue: number;
    taxRegime: "SIMPLIFIED" | "GENERAL";
    hasAccountant: boolean;
  }): TaxSignal[] {
    const signals: TaxSignal[] = [];

    // 🔴 SOLIQ XAVFI
    if (data.taxRegime === "GENERAL" && !data.hasAccountant) {
      signals.push({
        type: "RISK",
        severity: "HIGH",
        title: "Soliq xatolik xavfi yuqori",
        explanation:
          "Umumiy soliq rejimida buxgaltersiz ishlash katta jarima va xato xavfini keltirib chiqaradi."
      });
    }

    // 🟢 OPTIMIZATSIYA IMKONI
    if (data.monthlyRevenue < 100_000_000 && data.taxRegime === "GENERAL") {
      signals.push({
        type: "OPTIMIZATION",
        severity: "MEDIUM",
        title: "Soddalashtirilgan rejimga o‘tish mumkin",
        explanation:
          "Daromad limitlari asosida soddalashtirilgan soliq rejimi ko‘proq foyda berishi mumkin."
      });
    }

    return signals;
  }
}
