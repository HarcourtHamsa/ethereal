import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  format: format.json(),
  level: "info",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" }),
  ],
});
