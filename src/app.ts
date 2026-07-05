import express, { Application, json, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { indexRouter } from "./routes/index.js";
import status from "http-status";
import globalErrorHandler from "./middlewares/error-middleware.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/templates"));
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

app.use("/api/auth", toNodeHandler(auth));

app.use("/api/v1", indexRouter);

app.use((req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
    route: req.originalUrl,
  });
});

app.use(globalErrorHandler);

export default app;
