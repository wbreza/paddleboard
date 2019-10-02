import { App, CloudContext } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { UserProfile, Repository } from "@paddleboard/core";

export interface RepositoryApiContext extends CloudContext {
  user: UserProfile;
  repository: Repository;
}

export const app = new App(new AzureModule);
