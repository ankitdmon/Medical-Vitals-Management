import express from "express";
import * as insightCon from "../controllers/insights";

const router = express.Router();

router.post("/aggregate", insightCon.aggregateVitals);
router.post("/populate", insightCon.populationInsight);

export default router;
