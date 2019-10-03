import { CloudContext } from "@multicloud/sls-core";
import { app } from "../app";
import { config } from "../config"

const middlewares = config();

export const authorize = app.use(middlewares, (context: CloudContext) => {
  context.send("OK", 200);
});

export const hook = app.use(middlewares, (context: CloudContext) => {
  context.send("OK", 200);
});
