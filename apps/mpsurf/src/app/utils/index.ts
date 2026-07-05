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

export const numberComparator = (num1: string | number, num2: string | number) => {
  return +num1 - +num2;
};

export const dateComparator_ddMMyyyy = (date1: string, date2: string) => {
  // Helper to convert "dd.MM.yyyy" to "yyyyMMdd" for easy comparison
  const toSortableString = (dateStr: string) => {
    if (!dateStr) return null;
    
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    
    // Reorder to yyyyMMdd
    return parts[2] + parts[1].padStart(2, '0') + parts[0].padStart(2, '0');
  };
  
  const str1 = toSortableString(date1);
  const str2 = toSortableString(date2);
  
  if (!str1 && !str2) return 0;
  if (!str1) return 1;
  if (!str2) return -1;
  
  return str1.localeCompare(str2);
};

export const monthYearComparator = (value1: string, value2: string) => {
  // Complete month mapping with abbreviations
  const monthMap = {
    
    // Abbreviations
    'янв': 1, 'янв.': 1,
    'фев': 2, 'февр': 2, 'февр.': 2,
    'мар': 3, 'март': 3,
    'апр': 4, 'апр.': 4,
    'май': 5,
    'июн': 6, 'июнь': 6,
    'июл': 7, 'июль': 7,
    'авг': 8, 'авг.': 8,
    'сен': 9, 'сент': 9, 'сент.': 9,
    'окт': 10, 'окт.': 10,
    'ноя': 11, 'нояб': 11, 'нояб.': 11,
    'дек': 12, 'дек.': 12
  };
  
  const parseToSortable = (value: string) => {
    if (!value || typeof value !== 'string') return null;
    
    // Clean the value
    const cleanValue = value.trim().toLowerCase();
    
    // Split into month and year
    const parts = cleanValue.split(' ');
    if (parts.length !== 2) return null;
    
    let monthName = parts[0];
    const year = parseInt(parts[1], 10);
    
    // Remove trailing dot if present for lookup
    if (monthName.endsWith('.')) {
      monthName = monthName.slice(0, -1);
    }
    
    const month = monthMap[monthName as keyof typeof monthMap];
    
    // Try without last character if not found (for cases like "февр" -> "фев")
    if (!month && monthName.length > 3) {
      const shortMonth = monthName.slice(0, 3);
      const monthFromShort = monthMap[shortMonth as keyof typeof monthMap];
      if (monthFromShort) {
        return year * 100 + monthFromShort;
      }
    }
    
    if (!month || isNaN(year)) return null;
    
    // Return number in format YYYYMM for easy comparison
    return year * 100 + month;
  };
  
  const num1 = parseToSortable(value1);
  const num2 = parseToSortable(value2);
  
  // Handle null/undefined/invalid values
  if (num1 === null && num2 === null) return 0;
  if (num1 === null) return 1;  // Invalid values at the end
  if (num2 === null) return -1;
  
  // Compare numbers
  if (num1 < num2) return -1;
  if (num1 > num2) return 1;
  return 0;
};