
import { CosmosClient, Database, Container, CosmosClientOptions, Resource } from "@azure/cosmos";

export interface DataService<T> {
  get: (id: string, partitionKey?: string) => Promise<T>;
  list: (options: any) => Promise<T[]>;
  save: (item: T) => Promise<T>;
  delete: (id: string, partitionKey?: string) => Promise<void>;
};

export interface DataServiceOptions {
  endpoint: string
  key: string;
  databaseName: string;
  collectionName: string;
}

export abstract class DataServiceBase<T> implements DataService<T> {
  private readonly client: CosmosClient;
  private database: Database;
  private collection: Container;

  constructor(private options: DataServiceOptions) {
    const cosmosOptions: CosmosClientOptions = {
      endpoint: this.options.endpoint,
      key: this.options.key,
    };

    this.client = new CosmosClient(cosmosOptions);
    this.database = this.client.database(this.options.databaseName);
    this.collection = this.database.container(this.options.collectionName);
  }

  public async init() {
    const { database } = await this.client.databases.createIfNotExists({ id: this.options.databaseName });
    this.database = database;

    const { container } = await this.database.containers.createIfNotExists({ id: this.options.collectionName });
    this.collection = container;
  }

  public async list(): Promise<T[]> {
    const result = await this.collection.items.readAll().fetchAll();
    return result.resources as T[];
  }

  public async get(id: string, partitionKey?: string): Promise<T> {
    const result = await this.collection.item(id, partitionKey).read();
    return result.resource as T;
  }

  public async save(item: T): Promise<T> {
    const result = await this.collection.items.upsert(item);
    return result.resource as any;
  }

  public async delete(id: string, partitionKey?: string): Promise<void> {
    await this.collection.item(id, partitionKey).delete();
  }
}
