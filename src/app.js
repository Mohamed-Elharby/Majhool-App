import "./lib/db/mongoose.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { appRouter } from "./route.js";
import { globalError } from "./lib/globalError/globalErrror.js";
import { correlationId } from "./lib/correlation/correlationId.js";
import cookieParser from "cookie-parser";

export function creatAapp() {
  const app = express();

  app.use(helmet());

  app.use("/upload", express.static("upload"));

  app.use(express.json());

  app.use(cookieParser());

  app.use(cors({ origin: "http://localhost:4200", credentials: true }));

  app.use(correlationId);

  app.get("/health", (req, res, next) => {
    console.log("server hit");
    res.json("ok");
  });

  app.use("/api", appRouter);

  app.use(globalError);

  return app;
}