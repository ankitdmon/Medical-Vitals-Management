import express from "express";
import userRouter from "./user";
const app = express();

app.use("/eka-care", userRouter);

export default app;