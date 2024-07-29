import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import webhookRouter from "./routes/webhook.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
export let chatSessions: any = {};

app.use(webhookRouter);

app.get("/", (req, res) => {
  res.send(`
  <body style="background-color: black; display: flex; justify-content: center; align-items: center;">
  <h1 style="color: white;">API Disponível</h1>
  </body>
  `);
});

app.get("/well", (req, res) => {
  console.log("started!!")
  res.send("<h1>HellTESHESRorld!</h1>");
}); 

export default app;
