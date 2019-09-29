
import { CosmosClient, Database, Container, CosmosClientOptions } from "@azure/cosmos";
import shortid from "shortid";
import { Entity } from "../models/app";

export interface DataService<T extends Entity> {
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
  databaseOptions: any;
  collectionOptions: any;
}

export abstract class DataServiceBase<T extends Entity> implements DataService<T> {
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
    const { database } = await this.client.databases.createIfNotExists({
      id: this.options.databaseName,
      ...this.options.databaseOptions
    });
    this.database = database;

    const { container } = await this.database.containers.createIfNotExists({
      id: this.options.collectionName,
      ...this.options.collectionOptions
    });
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
    if (!item.id) {
      item.id = shortid.generate();
      item.audit = {
        created: new Date(),
        updated: new Date(),
      };
    }

    item.audit.updated = new Date();

    const result = await this.collection.items.upsert(item);
    return result.resource as any;
  }

  public async delete(id: string, partitionKey?: string): Promise<void> {
    await this.collection.item(id, partitionKey).delete();
  }
}
