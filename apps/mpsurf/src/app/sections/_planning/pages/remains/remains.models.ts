export interface IRemainsListItem {
  "name": string,
  "nmID": number,
  "barcode": string,
  "sku": string,
  "size": string,
  "fbo": string,
  "fbs": string,
  "from_client": string,
  "to_client": string,
  "total_stock": string,
  "cost_price": number,
  "price": number,
  "photo": string,
  "warehouse_name": string,
  "total_sebes": number,
  "stock_price": number
}

export interface IRemainsTableResponse { 
  data: IRemainsListItem[],
  total: {
    "fbo": number,
    "fbs": number,
    "from_client": number,
    "to_client": number,
    "total_stock": number,
    "cost_price": number,
    "price": number,
    "total_sebes": number,
    "stock_price": number
  },
  "totalRecord": number
}
