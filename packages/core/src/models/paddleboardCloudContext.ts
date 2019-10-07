import { CloudContext } from "@multicloud/sls-core";
import { UserProfile } from "./app";

export interface PaddleboardCloudContext extends CloudContext {
  user: UserProfile;
  [key: string]: any;
}
