import express from "express";
import { renderDashboard } from "./dashboard";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send(renderDashboard());
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Dashboard running on http://localhost:${PORT}`);
});
