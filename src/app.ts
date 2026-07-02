import express, { Application, json, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { indexRouter } from "./routes/index.js";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/templates"));
app.set("query parser", "extended");

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "ShopCo Server is running successfully",
  });
});

app.use("/api/v1", indexRouter);

export default app;
