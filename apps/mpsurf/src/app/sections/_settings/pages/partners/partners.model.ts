export interface IFinPartner {
  "UID": string,
  "INN": string |null,
  "KPP": string | null,
  "checking_account": string | null,
  "name": string,
  "status": number,
  "user_shop_id": number,
  "description": string | null,
  "shop_name": string,
  "expenses_item": string | null,
  "income_item": string | null,
  "sum_partners": string,
  "sum_receipt": string | number | null,
  "sum_order": string | number | null,
  "count_operation": string | number | null
}