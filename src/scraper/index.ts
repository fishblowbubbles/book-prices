import { BookDepositoryScraper } from './bookDepository'
import { GoodBookCompanyScraper } from './goodBookCompany'
import { STORE } from '../graph'
import { IScraper } from './interfaces'

export function createScraper (store: string): IScraper {
  switch (store) {
    case STORE.BOOK_DEPOSITORY:
      return BookDepositoryScraper
    case STORE.GOOD_BOOK_COMPANY:
      return GoodBookCompanyScraper
    default:
      throw Error(`Scraper for ${store} not found`)
  }
}
