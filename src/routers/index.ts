import express from "express";
import userRouter from "./user";
import vitalRouter from "./vital";
import insightRouter from  "./insights";

const app = express();

app.use("/eka-care", userRouter);
app.use("/eka-care", vitalRouter);
app.use("/eka-care", insightRouter);

export default app;