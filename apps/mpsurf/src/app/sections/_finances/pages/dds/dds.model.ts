export interface IRecursiveData {
  data: Record<string, string | number | null>,
  expanded?: boolean,
  children?: IRecursiveData[]
}

export interface IDDSGridData {
  data: IRecursiveData[],
  columns: 
    {
      "field": string,
      "header": string
    }[]
}


export interface IDDSAccount {
  "name": string | null,
  "date_balance_init": string | null,
  "balance_init": string | null,
  "description": string | null,
  "UID": string | null,
  "balance_current": string | null,
}

export interface IDDSPartner {
  "UID": string | null,
  "INN": string | null,
  "KPP": string | null,
  "checking_account": string | null,
  "name": string | null,
  "status": number,
  "user_shop_id": number,
  "description": string | null,
  "shop_name": string | null,
  "expenses_item": string | null,
  "income_item": string | null,
  "sum_partners": string | null,
  "sum_receipt": string | null,
  "sum_order": string | null,
  "count_operation": string | null,
}
