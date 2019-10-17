import { CosmosMiddleware, UserProfileValidationMiddleware, registerMixins, JwtMiddleware, CurrentUserMiddleware } from "@paddleboard/core";
import {
  LoggingServiceMiddleware,
  HTTPBindingMiddleware,
  PerformanceMiddleware,
  ExceptionMiddleware,
  ConsoleLogger,
  LogLevel,
} from "@multicloud/sls-core";

registerMixins();
const defaultLogger = new ConsoleLogger(LogLevel.VERBOSE);

export const config = () => {
  return [
    LoggingServiceMiddleware(defaultLogger),
    PerformanceMiddleware(),
    ExceptionMiddleware({ log: defaultLogger.log as any }),
    HTTPBindingMiddleware(),
    JwtMiddleware(),
    CurrentUserMiddleware(),
    UserProfileValidationMiddleware(),
    CosmosMiddleware(),
  ];
};
