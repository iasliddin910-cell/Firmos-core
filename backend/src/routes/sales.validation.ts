export function validateSalesInput(data: any) {
  if (
    typeof data.avgOrderValue !== "number" ||
    typeof data.monthlyOrders !== "number" ||
    typeof data.cancelRate !== "number"
  ) {
    throw new Error("Invalid input types");
  }

  if (data.avgOrderValue <= 0 || data.monthlyOrders <= 0) {
    throw new Error("Values must be greater than zero");
  }

  if (data.cancelRate < 0 || data.cancelRate > 1) {
    throw new Error("Cancel rate must be between 0 and 1");
  }
}
