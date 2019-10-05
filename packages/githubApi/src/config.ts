import dotenv from "dotenv";
import fs from "fs";
import { CosmosMiddleware, registerMixins } from "@paddleboard/core";
import {
  LoggingServiceMiddleware,
  HTTPBindingMiddleware,
  PerformanceMiddleware,
  ExceptionMiddleware,
  ConsoleLogger,
  LogLevel,
} from "@multicloud/sls-core";

dotenv.config();
registerMixins();
const defaultLogger = new ConsoleLogger(LogLevel.VERBOSE);

process.env.GITHUB_SIGNING_KEY = fs.readFileSync(`${process.cwd()}\\github.pem`).toString("utf8");

export const config = () => {
  return [
    LoggingServiceMiddleware(defaultLogger),
    PerformanceMiddleware(),
    ExceptionMiddleware({ log: defaultLogger.log as any }),
    HTTPBindingMiddleware(),
    CosmosMiddleware()
  ];
};
