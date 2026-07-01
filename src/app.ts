import express, { Application, json } from "express";
import path from "path";
import cookieParser from "cookie-parser";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/templates"));
app.set("query parser", "extended");

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
