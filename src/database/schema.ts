import { Knex } from "knex";

export function bookSchema(table: Knex.CreateTableBuilder): void {
  table.increments("id");
  table.string("name").unique().notNullable();
}

export function listingSchema(table: Knex.CreateTableBuilder): void {
  table.increments("id");
  table.integer("bookId").unsigned().references("book.id").onDelete("cascade");
  table.string("store").notNullable();
  table.string("url").notNullable();
  table.unique(["bookId", "store"]);
}

export function priceSchema(table: Knex.CreateTableBuilder): void {
  table.increments("id");
  table
    .integer("listingId")
    .unsigned()
    .references("listing.id")
    .onDelete("cascade");
  table.string("currency").notNullable();
  table.decimal("salePrice").notNullable();
  table.decimal("listPrice").notNullable();
  table.timestamp("createdAt").notNullable();
}

export async function createSchema(database: Knex): Promise<void> {
  await database.schema
    .createTable("book", bookSchema)
    .createTable("listing", listingSchema)
    .createTable("price", priceSchema);
}
