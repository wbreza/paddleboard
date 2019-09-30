import { DataServiceBase, DataListOptions } from "./dataService";
import { PullRequest } from "../models/app";

export class PullRequestService extends DataServiceBase<PullRequest> {
  public constructor() {
    super({
      collectionName: "PullRequest",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
      collectionOptions: {
        partitionKey: {
          paths: ["/repositoryId"]
        }
      }
    });
  }

  public async getByRepository(repositoryId: string, options?: DataListOptions): Promise<PullRequest[]> {
    return await this.find({ repositoryId }, options);
  }

  public async getByUser(userId: string, options?: DataListOptions): Promise<PullRequest[]> {
    return await this.find({ userId }, options);
  }

  public async getByCategory(categoryId: string, options?: DataListOptions): Promise<PullRequest[]> {
    return await this.find({ categoryId }, options);
  }

  public async getByAccount(accountId: string, options?: DataListOptions): Promise<PullRequest[]> {
    return await this.find({ accountId }, options);
  }
}
