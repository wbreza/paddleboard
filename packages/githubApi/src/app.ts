import { App, CloudContext } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { GitHubService } from "@paddleboard/core";

export interface GitHubApiContext extends CloudContext {
  github: GitHubService;
}

export const app = new App(new AzureModule);
