import express from "express";
import userRouter from "./user";
import vitalRouter from "./vital";
const app = express();

app.use("/eka-care", userRouter);
app.use("/eka-care", vitalRouter);

export default app;