import { load } from 'cheerio'

export type Root = ReturnType<typeof load>;

export interface IScraper {
  getName: ($: Root) => string;
  getCurrency: ($: Root) => string;
  getSalePrice: ($: Root) => number;
  getListPrice: ($: Root) => number;
}
