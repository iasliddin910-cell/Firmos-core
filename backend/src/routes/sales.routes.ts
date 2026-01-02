import { Router } from "express";
import { SalesAgent } from "../agents/SalesAgent";
import { validateSalesInput } from "./sales.validation";
const router = Router();

// test endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    agent: "SalesAgent",
    time: new Date().toISOString()
  });
});

// asosiy sales analysis endpoint
router.post("/analyze", async (req, res) => {
  try {
    const inputData = req.body;
validateSalesInput(inputData);
    const agent = new SalesAgent();
    const result = await agent.analyze(inputData);

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Sales analysis failed"
    });
  }
});

export default router;
