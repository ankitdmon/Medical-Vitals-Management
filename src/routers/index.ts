import express from "express";
import userRouter from "./user";
import vitalRouter from "./vital";
import insightRouter from "./insights";
import {
  INSIGHT_ROUTE,
  USER_ROUTE,
  VITAL_ROUTE,
} from "../validations/endpoints";

const app = express();

app.use(USER_ROUTE, userRouter);
app.use(VITAL_ROUTE, vitalRouter);
app.use(INSIGHT_ROUTE, insightRouter);

export default app;
