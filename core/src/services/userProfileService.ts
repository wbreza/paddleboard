import { DataServiceBase } from "./dataService";
import { UserProfile } from "../models/app";

export class UserProfileService extends DataServiceBase<UserProfile> {
  public constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
      collectionOptions: {
        uniqueKeyPolicy: {
          uniqueKeys: [
            { paths: ["/email"] }
          ]
        }
      }
    });
  }

  public async getByEmail(email: string): Promise<UserProfile> {
    return await this.findSingle({ email });
  }
}
