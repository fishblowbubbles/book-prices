import { Knex } from "knex";
import { DatabaseError } from "./errors";
import { IEntity } from "./interfaces";

async function execute(callback: any): Promise<any> {
  try {
    return await callback();
  } catch (error) {
    // TODO: log

    // sanitize
    throw new DatabaseError();
  }
}

export function createRepository(knex: Knex) {
  return {
    select: async function (
      tableName: string,
      fields: string[],
      condition: Partial<IEntity>
    ): Promise<IEntity[]> {
      return await execute(async function () {
        return await knex(tableName)
          .select(...fields)
          .where(condition);
      });
    },
    insert: async function (
      tableName: string,
      values: Partial<IEntity>
    ): Promise<number> {
      const bookIds = await execute(async function () {
        return await knex(tableName).insert(values);
      });

      return bookIds[0];
    },
    update: async function (
      tableName: string,
      condition: Partial<IEntity>,
      values: Partial<IEntity>
    ): Promise<boolean> {
      await execute(async function () {
        await knex(tableName).where(condition).update(values);
      });

      return true;
    },
  };
}
