export interface ICostPriceListItem {
  "id": number,
  "shop_name": string,
  "SKU": string,
  "nmid": string,
  "Barcode": string,
  "techSize": string,
  "subject": string,
  "category": string | null,
  "category_pnl": string | null,
  "brand": string,
  "status_name": string | null,
  "colors": string,
  "photo_new": string,
  "sebes": string,
  "cost_price": string,
  "other_deductions": string,
  "tags": string | null,
  "date": string
}

export interface ICostPriceResponse {
  data: ICostPriceListItem[],
  totalRecord: number
}