import express from "express";
import userRouter from "./user";
import vitalRouter from "./vital";
import insightRouter from "./insights";
import { MAIN } from "../validations/endpoints";

const app = express();

app.use(MAIN, userRouter);
app.use("/eka-care", vitalRouter);
app.use("/eka-care", insightRouter);

export default app;
