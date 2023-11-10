import express from "express";
import * as vitalCon from "../controllers/vital";

const router = express.Router();

router.post("/vital", vitalCon.createVital);

router.get("/vital", vitalCon.vitals);

router.put("/vital", vitalCon.updateVital);

router.delete("/vital", vitalCon.deleteVital);

export default router;
