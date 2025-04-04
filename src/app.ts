import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error";
import routes from "./routes";

export const app = express();

const whitelist = ["http://localhost:3000"];

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (
      origin: string | undefined,
      callback: (arg0: Error | null, arg1?: boolean) => any
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/v1", routes);

app.use(errorMiddleware);
