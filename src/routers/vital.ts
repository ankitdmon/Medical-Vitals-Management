import express from "express";
import * as vitalCon from "../controllers/vital";

const router = express.Router();

router.post("vital/:userId", vitalCon.createVital);

router.get("vital", vitalCon.vitals);

router.put("vital/:id", vitalCon.updateVital);

router.delete("vital/:id", vitalCon.deleteVital);

export default router;
