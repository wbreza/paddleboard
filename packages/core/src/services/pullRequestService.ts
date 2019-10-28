import { DataServiceBase, DataListOptions } from "./dataService";
import { PullRequest } from "../models/app";
import { UserRepositoryService } from "./userRepositoryService";
import { SqlQuerySpec } from "@azure/cosmos";

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
    const userRepositoryService = new UserRepositoryService();
    const userRepos = await userRepositoryService.getByUser(userId);
    const values = userRepos.map((repo) => `"${repo.id}`).join(",");

    const query: SqlQuerySpec = {
      query: `SELECT * FROM Repositories r WHERE r.id IN(${values})`,
      parameters: []
    };

    return this.query(query, options);
  }

  public async getByCategory(userId: string, categoryId: string, options?: DataListOptions): Promise<PullRequest[]> {
    const userRepositoryService = new UserRepositoryService();
    const userRepos = await userRepositoryService.getByCategory(userId, categoryId);
    const values = userRepos.map((repo) => `"${repo.id}`).join(",");

    const query: SqlQuerySpec = {
      query: `SELECT * FROM Repositories r WHERE r.id IN(${values})`,
      parameters: []
    };

    return this.query(query, options);
  }

  public async getByAccount(accountId: string, options?: DataListOptions): Promise<PullRequest[]> {
    return await this.find({ accountId }, options);
  }
}
