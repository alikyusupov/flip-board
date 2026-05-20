export interface IOrdersTableItem {
  "photo": string,
  "nmID": string,
  "techSize": string,
  "subject": string,
  "barcode": string,
  "supplierArticle": string,
  "brand": string,
  "category_pnl": string | null,
  [key: string]: { order_sum: string | number, order_count: string | number } | string | null
}

export interface IOrdersTable {
  table: IOrdersTableItem[]
}

export interface IOrdersChart {
  chart: IOrdersChartItem[]
}

export interface IOrdersChartItem {
  orders_count: string | number,
  orders_sum: string | number,
  cancel_sum: string | number,
  cancel_count: string | number ,
  gr_date: string | number
}