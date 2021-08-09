export enum STORE {
  BOOK_DEPOSITORY = "BOOK_DEPOSITORY",
  GOOD_BOOK_COMPANY = "GOOD_BOOK_COMPANY",
}

export const storeName: Record<STORE, string> = {
  [STORE.BOOK_DEPOSITORY]: "Book Depository",
  [STORE.GOOD_BOOK_COMPANY]: "Good Book Company",
};

export const FIELDS = [
  "name",
  "store",
  "currency",
  "salePrice",
  "listPrice",
  "createdAt",
];
