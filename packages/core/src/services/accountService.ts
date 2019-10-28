import { DeveloperAccount, UserProfile } from "../models/app";
import { ChildDataService } from "./childDataService";

export class AccountService extends ChildDataService<UserProfile, DeveloperAccount> {
  public constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    }, "accounts");
  }

  public async getByUser(userId: string): Promise<DeveloperAccount[]> {
    return await this.list(userId);
  }

  public async getByEmail(email: string): Promise<DeveloperAccount[]> {
    const user = await this.parentService.findSingle({ email });
    return user ? user.accounts : [];
  }
}
