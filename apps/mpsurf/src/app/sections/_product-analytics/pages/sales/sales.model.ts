export interface ISalesTableItem {
  "photo": string,
  "nmID": string,
  "techSize": string,
  "subject": string,
  "barcode": string,
  "supplierArticle": string,
  "brand": string,
  "category_pnl": string | null,
  [key: string]: { sale_sum: string | number, sale_count: string | number } | string | null
}

export interface ISalesTable {
  table: ISalesTableItem[]
}

export interface ISalesChart {
  chart: ISalesChartItem[]
}

export interface ISalesChartItem {
  sales_count: string | number,
  sales_sum: string | number,
  returns_sum: string | number,
  returns_count: string | number ,
  gr_date: string | number
}