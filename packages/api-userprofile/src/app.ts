import { App } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";

export const app = new App(new AzureModule);
