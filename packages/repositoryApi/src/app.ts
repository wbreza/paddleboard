import { App } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { PaddleboardCloudContext, Repository, Category } from "@paddleboard/core";

export interface RepositoryApiContext extends PaddleboardCloudContext {
  category?: Category;
  repository: Repository;
}

export const app = new App(new AzureModule);
