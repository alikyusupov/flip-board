export interface IStatsListItem {
  "advertId": number | string,
  "name": string,
  "adv_type": string,
  "nmId": number | string,
  "views": number | string | null,
  "clicks": number | string | null,
  "ctr": number | string | null,
  "cpc": number | string | null,
  "sum": number | string | null,
  "atbs": number | string | null,
  "cr": string | number | null,
  "shks":  number | string,
  "sum_price":  number | string,
  "date":  number | string
}

export interface IStatsChartItem {
  "adv_sum": number,
  "adv_count": number,
  "orders_sum": number,
  "orders_count": string | number,
  "date": string
}

export interface IStatsListResponse {
  data: IStatsListItem[]
}

export interface IStatsChartResponse {
  data: IStatsChartItem[]
}

