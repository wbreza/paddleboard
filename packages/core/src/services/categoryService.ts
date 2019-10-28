import { Category, UserProfile } from "../models/app";
import { ChildDataService } from "./childDataService";

export class CategoryService extends ChildDataService<UserProfile, Category> {
  public constructor() {
    super({
      collectionName: "UserProfile",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    }, "categories");
  }

  public async getByUser(userId: string): Promise<Category[]> {
    return await this.list(userId);
  }
}
