export interface IBookEntity {
  id: number;
  name: string;
}

export interface IListingEntity {
  id: number;
  bookId: number;
  store: string;
  url: string;
}

export interface IPriceEntity {
  id: number;
  listingId: number;
  currency: string;
  salePrice: number;
  listPrice: number;
  createdAt: number;
}

export type IEntity = IBookEntity | IListingEntity | IPriceEntity;
