/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPlanFactItem {
  "id": number,
  "created_at": string,
  "created_at_full": string,
  "plan_name": string,
  "start_date": string,
  "days": number,
  "type": string,
  "method": string,
  "goal_rub": number,
  "monthFrom": string,
  "yearFrom": string,
  "dateFrom": string,
  "status": string
}

export interface IPlanFactGeneralInfo {
  id: number
  created_at: string
  plan_name: string
  start_date: string
  Ym: string
  days: number
  type: number
  method: number
  goal_rub: string
  been_days: number
  left_days: number
  table: IGeneralInfoTable
}

export interface Table {
  plan: Plan
  fact: Fact
  delta_rub: DeltaRub
  delta_percent: DeltaPercent
}

export interface Plan {
  sum_day: number
  sum_today: number
  sum_rub: string
}

export interface Fact {
  sum_day: number
  sum_today: number
  sum_rub: number
}

export interface DeltaRub {
  sum_day: number
  sum_today: number
  sum_rub: number
}

export interface DeltaPercent {
  sum_day: number
  sum_today: number
  sum_rub: number
}

export interface IPlanFactChartItem {
  ordersCount: string | null
  cancelsCount: string | null
  ordersTotal: number | null
  cancelsTotal: number | null
  salesCount?: string | number | null
  returnsCount?: string | number | null
  salesTotal?: string | number | null
  returnsTotal?: string | number | null
  date: string
}

export interface IPlanFactById {
  id: number
  plan_name: string
  start_date: string
  type: number
  method: number
  goal_rub: number | string | null
  monthFrom: string
  yearFrom: string
  dateFrom: string
  articles: IPlanFactByIdArticle[]
}

export interface IPlanFactByIdArticle {
  isChecked: number
  SKU: string
  plan_sum: number
  nmid: string
  subject: string
  category?: string | null
  category_pnl?: string | number | null
  brand: string
  status_name?: string | null
}

export interface IFullTableItem {
  level: number
  expanded: boolean
  type: string
  total: number
  plan_day?: number | null
  [key: string]: any
  articles: IFullTableItemArticle[]
}

export interface IFullTableItemArticle {
  type: string
  total: number
  plan_day?: number | null
  [key: string]: any
}

export type IGeneralInfoTable = Record<string, {
        "sum_day": number,
        "sum_today": number,
        "sum_rub": number
    }>;
