import fs from "fs";
import knex, { Knex } from "knex";

import { createSchema } from "./schema";

const PATH = "./books.sqlite";

let instance: Knex | undefined;

export async function createConnection(): Promise<Knex> {
  async function initialize(): Promise<Knex> {
    const database = knex({
      client: "sqlite3",
      connection: {
        filename: PATH,
      },
      useNullAsDefault: true,
    });
    database.raw("PRAGMA foreign_keys = ON;");

    if (!fs.existsSync(PATH)) {
      await createSchema(database);
    }

    return database;
  }

  if (!instance) {
    instance = await initialize();
  }

  return instance;
}

export * from "./interfaces";
export * from "./repository";
