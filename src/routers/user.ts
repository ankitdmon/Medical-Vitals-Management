import express from "express";
import * as userCon from "../controllers/user";

const router = express.Router();

router.post("/user", userCon.createUser);
router.get("/user/:userName", userCon.getUser);

export default router;
