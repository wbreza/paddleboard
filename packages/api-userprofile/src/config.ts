import { CosmosMiddleware, JwtMiddleware, CurrentUserMiddleware } from "@paddleboard/core";
import {
  LoggingServiceMiddleware,
  HTTPBindingMiddleware,
  PerformanceMiddleware,
  ExceptionMiddleware,
  ConsoleLogger,
  LogLevel,
  Middleware,
} from "@multicloud/sls-core";

const defaultLogger = new ConsoleLogger(LogLevel.VERBOSE);

export const config = (): Middleware[] => {
  return [
    LoggingServiceMiddleware(defaultLogger),
    PerformanceMiddleware(),
    ExceptionMiddleware({ log: defaultLogger.log as any }),
    HTTPBindingMiddleware(),
    JwtMiddleware(),
    CurrentUserMiddleware(),
    CosmosMiddleware()
  ];
};
