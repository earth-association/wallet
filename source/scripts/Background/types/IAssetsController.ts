export interface IAssetsController {
  fetchFiatPrice: (currency?: string) => Promise<void>;
  fetchFiatPrices: (symbols: keyable, currency?: string) => Promise<void>;
  getAssetsOfAccountsGroup: (accounts: keyable[][]) => Promise<void>;
}

export interface keyable {
  [key: string]: any;
}
