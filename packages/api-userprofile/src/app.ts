import { App } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { config } from "./config";

const middlewares = config();
export const app = new App(new AzureModule);
app.registerMiddleware(...middlewares);
