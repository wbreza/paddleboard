import { DataServiceBase } from "./dataService";
import { UserProfile } from "../models/app";

export class UserProfileService extends DataServiceBase<UserProfile> {
  constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    });
  }
}
