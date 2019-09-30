import { DataServiceBase, DataListOptions } from "./dataService";
import { Category } from "../models/app";

export class CategoryService extends DataServiceBase<Category> {
  public constructor() {
    super({
      collectionName: "Category",
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

  public async getByUser(userId: string, options?: DataListOptions): Promise<Category[]> {
    return await this.find({ userId }, options);
  }
}
