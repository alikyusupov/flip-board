export type IClustersGrid = IClusterGridItem[][]

export interface IClusterGridItem {
  "header": string,
  "data": {
    "nmID"?: string,
    "object"?: string,
    "photo_new"?: string | null,
    "sku"?: string,
    "from_local_orders"?: number | null,
    "remains_today"?: string,
    "orders_total"?: string,
    "orders_local"?: string,
    "orders_not_local"?: string,
    "moved_to_other_cluster"?: string,
    "sales_from_orders"?: string,
    "avg_speed"?: number,
    "due_to"?: string
  }
}