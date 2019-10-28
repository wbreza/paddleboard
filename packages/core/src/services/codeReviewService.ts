import { DataServiceBase, DataListOptions } from "./dataService";
import { CodeReview } from "../models/app";

export class CodeReviewService extends DataServiceBase<CodeReview> {
  public constructor() {
    super({
      collectionName: "CodeReview",
      databaseName: "Paddleboard",
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
      collectionOptions: {
        partitionKey: {
          paths: ["/pullRequestId"]
        }
      }
    });
  }

  public async getByUser(userId: string, options?: DataListOptions): Promise<CodeReview[]> {
    return await this.find({ userId }, options);
  }

  public async getByPullRequest(pullRequestId: string, options?: DataListOptions): Promise<CodeReview[]> {
    return await this.find({ pullRequestId }, options);
  }
}
