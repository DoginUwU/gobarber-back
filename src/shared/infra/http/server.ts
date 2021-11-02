import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import uploadConfig from "@config/upload";
import { errors } from "celebrate";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

import "@shared/infra/typeorm";
import "@shared/container";
import rateLimiter from "./middlewares/rateLimiter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(3333, () => {
    console.log("🚀 Server is running on port 3333");
});
