// prettier-ignore
export const CURRENCY_TO_SYMBOL: Record<string, string> = {
  "SGD": "$",
  "USD": "US$",
  "GBP": "£",
}

export function parsePriceString(
  priceString: string,
  currency: string
): number {
  return parseFloat(priceString.replace(CURRENCY_TO_SYMBOL[currency], ""));
}
