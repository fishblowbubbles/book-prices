import { STORE } from "./constants";

export interface IGetInput {
  id: number;
}

export interface IHistoryInput {
  id: number;
  store: STORE;
}

export interface IAddInput {
  url: string;
  store: STORE;
  name?: string;
}

export interface IPullInput {
  id: number;
}

export interface IRenameInput {
  id: number;
  name: string;
}

export interface IBookDetails {
  name: string;
}

export interface IPriceDetails {
  currency: string;
  salePrice: number;
  listPrice: number;
}

export interface IDetails {
  book: IBookDetails;
  price: IPriceDetails;
}
