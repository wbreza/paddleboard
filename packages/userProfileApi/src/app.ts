import { App, CloudContext } from "@multicloud/sls-core";
import { AzureModule } from "@multicloud/sls-azure";
import { UserProfile } from "@paddleboard/core";

export interface UserProfileApiContext extends CloudContext {
  user: UserProfile;
}

export const app = new App(new AzureModule);
