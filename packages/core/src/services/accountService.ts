import { DataServiceBase, DataListOptions } from "./dataService";
import { Account } from "../models/app";

export class AccountService extends DataServiceBase<Account> {
  public constructor() {
    super({
      collectionName: "Account",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
      collectionOptions: {
        partitionKey: {
          paths: ["/userId"]
        }
      }
    });
  }

  public async getByUser(userId: string, options?: DataListOptions): Promise<Account[]> {
    return await this.find({ userId }, options);
  }

  public async getByProvider(providerId: string, providerType: string): Promise<Account> {
    return await this.findSingle({ providerId, providerType });
  }
}
