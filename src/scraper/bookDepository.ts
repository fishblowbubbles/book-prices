import { parsePriceString } from './helpers'
import { IScraper, Root } from './interfaces'

export const BookDepositoryScraper: IScraper = {
  getName: function ($: Root): string {
    return $('div.item-info > h1').text().trim()
  },
  getCurrency: function ($: Root): string {
    return $("#selectCurrency > [selected='selected']").attr('value') || ''
  },
  getSalePrice: function ($: Root): number {
    return parsePriceString(
      $('span.sale-price').text().trim(),
      this.getCurrency($)
    )
  },
  getListPrice: function ($: Root): number {
    return parsePriceString(
      $('span.list-price').text().trim(),
      this.getCurrency($)
    )
  }
}
