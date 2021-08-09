import { parsePriceString } from './helpers'
import { IScraper, Root } from './interfaces'

export const GoodBookCompanyScraper: IScraper = {
  getName: function ($: Root): string {
    return $('div.product-detail h1').text().trim()
  },
  getCurrency: function ($: Root): string {
    return 'GBP'
  },
  getSalePrice: function ($: Root): number {
    return parsePriceString(
      $('#product-price').text().trim(),
      this.getCurrency($)
    )
  },
  getListPrice: function ($: Root): number {
    return parsePriceString(
      $('span.old-price').text().trim(),
      this.getCurrency($)
    )
  }
}
