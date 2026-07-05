export interface IApiReport {
  "name": string | null,
  "update_date": string | null,
  "last_data_date": string | null,
}

export interface IShopWB {
  "id": number,
  "user_id": number,
  "name": string,
  "tax_percent": string | null,
  "tax_type": number | null,
  "tax_nds": string | null,
  "count_datetime_last_connec_MP": string | null,
  "wb_key_apinew_status": number | null,
  "sign_ozon": number | null,
  "oz_token_status": number | null,
  "oz_adv_token_status": number | null,
  "wb-integration": number | null,
  "readOnly": number | null,
  "refresh_token_url": string | null,
  "api_key_mpall": string | null,
  "currency_name": string | null,
  "api_reports": IApiReport[]
}

export type DialogType = 'connection-name' | 'tax' | 'currency' | 'api-report'

export interface ITaxItem {
  "id": number,
  "date": string,
  "tax_type": number,
  "tax_percent": string,
  "nds_percent": string
}