import { Router } from "express";
import { CompanyBrain } from "../core/CompanyBrain";
import { SalesAgent, SalesContext } from "../agents/SalesAgent";

const router = Router();

router.post("/analyze-sales", (req, res) => {
  const context: SalesContext = req.body;

  const brain = new CompanyBrain();
  const salesAgent = new SalesAgent(brain);

  salesAgent.analyze(context);

  const decision = brain.analyze();

  res.json({
    status: "OK",
    decision
  });
});

export default router;
