export enum CURRENCY {
  USD = 'USD',
  AUD = 'AUD'
}

export namespace CURRENCY {
  export function getLocale(currency: CURRENCY) {
    switch(currency){
      case CURRENCY.USD:
        return 'en-US';
      case CURRENCY.AUD:
        return 'en-AU';
    }
  }
}
