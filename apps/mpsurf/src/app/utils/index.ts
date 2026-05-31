import { IArticleFilterItem, IFilterOption, IGoodFilterItem, IImtIdFilterItem, IStatusFilterItem } from "@models"

type FilterOptionType = string | IArticleFilterItem | IStatusFilterItem | IGoodFilterItem | IImtIdFilterItem

function isString(option: FilterOptionType): option is string {
  return typeof option === 'string'
}

function isArticle(option: FilterOptionType): option is IArticleFilterItem {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return typeof option === 'object' && option['name'] && option['code']
}

function isStatus(option: FilterOptionType): option is IStatusFilterItem {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return typeof option === 'object' && option['name'] && option['id']
}

function isGood(option: FilterOptionType): option is IGoodFilterItem {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return typeof option === 'object' && option['SKU'] && option['Barcode']
}

function isImtId(option: FilterOptionType): option is IImtIdFilterItem {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return typeof option === 'object' && option['imtID'] && option['vendorCode']
}

export function filterOptionMapper(option: FilterOptionType): IFilterOption {

  if(isString(option)){
    return {
      label: option,
      value: option
    }
  }
  else if(isArticle(option)){
    return {
      label: option.name,
      value: option.code
    }
  }
  else if(isStatus(option)) {
    return {
      label: option.name,
      value: option.name
    }
  }
  else if(isGood(option)) {
    return {
      label: `${option.nmid}-${option.SKU}`,
      value: option.nmid
    }
  }
  else if(isImtId(option)) {
    return {
      label: `${option.imtID}-${option.vendorCode}`,
      value: option.imtID
    }
  }
  else {
    return {
      label: option,
      value: option
    }
  }
}

export function getCurrencyIcon(currency = 'RUB'): string {

  switch (currency) {
    case 'RUB':
      return '₽';
    case 'KGS':
      return 'сом';
    case 'BYN':
      return 'р.';
    case 'KZT':
      return '₸';
    case 'AMD':
      return 'драм';
    case 'GEL':
      return '₾';
    case 'USD':
      return '$';
    default:
      return '₽';
  }
}

export const DateSortFuncDesc = (a: {date: string}, b: {date: string}): number => {

  if(typeof a === 'string' && typeof b === 'string') {
    return dateToMs(b) - dateToMs(a)
  }

  return dateToMs(b.date) - dateToMs(a.date)

};

export function dateToMs(date: string): number {

  const [day, month, year] = date.split('.');

  const d = new Date(+year, +month-1, +day)

  return d.getTime()

}

export const NumberSortFunc = (num1: number, num2: number) => {
  return num1 - num2;
};