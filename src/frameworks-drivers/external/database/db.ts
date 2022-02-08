import { MongoClient, Collection, Db } from "mongodb";
import "dotenv/config";


export const MongoHelper = {
  client: null as unknown as MongoClient,
  db: null as unknown as Db,
  async connect(uri: string): Promise<void> {
    console.log("Connecting to Mongo");
    this.client = await MongoClient.connect(uri);
    this.db = this.client.db(process.env.DATABASE_NAME);
    console.log(`conneted to ${this.db.databaseName}`);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },
  getCollection(name: string) {
    return this.client.db(process.env.DATABASE_NAME).collection(name);
  },
  async clearCollection(name: string): Promise<void> {
    await this.client
      .db(process.env.DATABASE_NAME)
      .collection(name)
      .deleteMany({});
  },
};
