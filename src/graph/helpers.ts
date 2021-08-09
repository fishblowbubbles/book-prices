import axios from "axios";
import cheerio from "cheerio";

import { IDetails } from "./interfaces";
import { createScraper } from "../scraper";

export function removeParams(url: string): string {
  if (url.includes("?")) {
    const index = url.indexOf("?");
    url = url.slice(0, index);
  }

  return url;
}

export async function scrape(
  store: string,
  url: string,
  name?: string
): Promise<IDetails> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const scraper = createScraper(store);

  const currency = scraper.getCurrency($);
  const salePrice = scraper.getSalePrice($);
  const listPrice = scraper.getListPrice($) || salePrice;

  const book = { name: name || scraper.getName($) };
  const price = { currency, salePrice, listPrice };

  return { book, price };
}
