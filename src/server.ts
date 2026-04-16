import express, { Request, Response } from "express";
import { dashboard } from "./dashboard";

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (_req: Request, res: Response) => {
  res.send(dashboard());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sales dashboard running on http://0.0.0.0:${PORT}`);
});
