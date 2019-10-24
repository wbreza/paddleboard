import { Account, UserProfile } from "../models/app";
import { ChildDataService } from "./childDataService";

export class AccountService extends ChildDataService<UserProfile, Account> {
  public constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    }, "accounts");
  }

  public async getByUser(userId: string): Promise<Account[]> {
    return await this.list(userId);
  }

  public async getByProvider(providerId: string, providerType: string): Promise<Account> {
    return await this.findSingle({ providerId, providerType });
  }
}
