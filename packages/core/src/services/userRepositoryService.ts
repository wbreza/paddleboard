import { Repository, UserProfile } from "../models/app";
import { ChildDataService } from "./childDataService";

export class UserRepositoryService extends ChildDataService<UserProfile, Repository> {
  public constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
    }, "repositories");
  }

  public async getByUser(userId: string): Promise<Repository[]> {
    return await this.list(userId);
  }

  public async getByCategory(userId: string, categoryId: string): Promise<Repository[]> {
    const repositories = await this.list(userId);
    return repositories.filter((repo) => repo.categoryId === categoryId);
  }
}
