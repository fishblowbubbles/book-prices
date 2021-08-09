import {
  IAddInput,
  IGetInput,
  IHistoryInput,
  IPullInput,
  IRenameInput,
} from "./interfaces";
import { createConnection, createRepository, IEntity } from "../database";
import { scrape } from "./helpers";
import { FIELDS } from "./constants";

export async function createResolvers() {
  const knex = await createConnection();
  const repository = createRepository(knex);

  return {
    // TODO: Retrieve only the latest price by store
    list: async function (): Promise<IEntity> {
      return await knex("book")
        .join("listing", "book.id", "listing.bookId")
        .join("price", "listing.id", "price.listingId")
        .select({ id: "book.id" }, ...FIELDS);
    },
    // TODO: Add store input field
    get: async function ({ id }: IGetInput): Promise<IEntity | null> {
      const data = await knex("book")
        .join("listing", "book.id", "listing.bookId")
        .join("price", "listing.id", "price.listingId")
        .select({ id: "book.id" }, ...FIELDS)
        .where("book.id", id)
        .orderBy("createdAt", "desc")
        .limit(1);

      if (data.length > 0) {
        return data[0];
      }

      return null;
    },
    // TODO: Add store input field
    history: async function ({ id, store }: IHistoryInput): Promise<IEntity[]> {
      return await knex("book")
        .join("listing", "book.id", "listing.bookId")
        .join("price", "listing.id", "price.listingId")
        .select({ id: "book.id" }, ...FIELDS)
        .where("book.id", id)
        .where("store", store)
        .orderBy("createdAt", "desc");
    },
    add: async function ({
      store,
      url,
      name,
    }: IAddInput): Promise<IEntity | null> {
      const { book, price } = await scrape(store, url, name && name.trim());

      const bookRows = await repository.select("book", ["id"], {
        name: book.name,
      });

      const bookId =
        bookRows.length > 0
          ? bookRows[0].id
          : await repository.insert("book", { name: book.name });
      const listingId = await repository.insert("listing", {
        store,
        url,
        bookId,
      });
      const _ = await repository.insert("price", {
        ...price,
        listingId: listingId,
        createdAt: Date.now(),
      });

      return await this.get({ id: bookId });
    },
    pull: async function ({ id }: IPullInput): Promise<IEntity | null> {
      const data = await knex("book")
        .join("listing", "book.id", "listing.bookId")
        .where("book.id", id);

      for (const row of data) {
        const { price } = await scrape(row.store, row.url, row.name);
        const _ = await repository.insert("price", {
          ...price,
          listingId: row.id,
          createdAt: Date.now(),
        });
      }

      return await this.get({ id });
    },
    rename: async function ({ id, name }: IRenameInput): Promise<boolean> {
      return await repository.update("book", { id }, { name: name.trim() });
    },
  };
}

export * from "./constants";
export * from "./interfaces";
