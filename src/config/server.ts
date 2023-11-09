import express from "express";
import bodyParser from "body-parser";
import dns from "dns";
import os from "os";
import connectDB from "./db";

const app = express();
const PORT = process.env.PORT;

// For JSON inputs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

connectDB();

dns.lookup(os.hostname(), (err, address, _family) => {
  if (err) {
    console.error("Failed to get IP address:", err);
  } else {
    console.log(`Address: ${address}`);
  }
});

export default app;
