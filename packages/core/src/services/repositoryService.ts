import { DataServiceBase, DataListOptions } from "./dataService";
import { Repository } from "../models/app";

export class RepositoryService extends DataServiceBase<Repository> {
  public constructor() {
    super({
      collectionName: "Repository",
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

  public async getByUser(userId: string, options?: DataListOptions): Promise<Repository[]> {
    return await this.find({ userId }, options);
  }

  public async getByCategory(categoryId: string, options?: DataListOptions): Promise<Repository[]> {
    return await this.find({ categoryId }, options);
  }

  public async getByAccount(accountId: string, options?: DataListOptions): Promise<Repository[]> {
    return await this.find({ accountId }, options);
  }
}
