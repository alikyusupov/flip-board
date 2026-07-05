
export interface IDdrListResponse {
  data: IDdrListItem[]
}

export interface IDdrListItem {
  "date": string,
  "nmId": number,
  "orders_count": number | string,
  "orders_sum": number,
  "subject": string,
  "category_pnl": string,
  "sku": string,
  "photo": string,
  "order_price": string | number,
  "drr": string | number,
  "drr_sales": string | number,
  "sales_from_orders_sum": number,
  "sales_from_orders_count": number | string,
  "sales_sum_cps": string | number,
  "updSum": number,
  "advertId": string | null | number
}
