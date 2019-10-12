import { App } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { PaddleboardCloudContext, Category } from "@paddleboard/core";

export interface CategoryApiContext extends PaddleboardCloudContext {
  category: Category;
}

export const app = new App(new AzureModule);
