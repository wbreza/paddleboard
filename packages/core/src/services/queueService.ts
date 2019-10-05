import { SharedKeyCredential, StorageURL, ServiceURL, QueueURL, MessagesURL, Aborter, MessagesEnqueueResponse } from "@azure/storage-queue";

export interface QueueServiceOptions {
  account: string;
  key: string;
  queueName: string;
}

export class QueueService {
  private messageUrl: MessagesURL;

  public constructor(private options: QueueServiceOptions) {
    const credientials = new SharedKeyCredential(this.options.account, this.options.key);
    const pipeline = StorageURL.newPipeline(credientials);
    const url = `https://${this.options.account}.queue.core.windows.net`
    const serviceUrl = new ServiceURL(url, pipeline);

    const queueUrl = QueueURL.fromServiceURL(serviceUrl, this.options.queueName);
    this.messageUrl = MessagesURL.fromQueueURL(queueUrl);
  }

  public async enqueue(payload: any): Promise<MessagesEnqueueResponse> {
    const message = Buffer.from(JSON.stringify(payload)).toString("base64");
    return await this.messageUrl.enqueue(Aborter.none, message);
  }
}
