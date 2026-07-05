export interface IFinOperation {
  "UID": string,
  "parent_id": string | null,
  "group_id": number,
  "type_operation": number,
  "amount": string,
  "account_id": string,
  "date_payment": string,
  "date_accrual": string,
  "partner_id": string | null,
  "created_at": string,
  "project": string | null,
  "name_partners": string | null,
  "name_account": string,
  "name_item": string,
  "item_id": number,
  "product_code": string | null,
  "description": string | null,
  "shop_name": string,
  "type_operation_title": string
}

export interface IFinOperationExportItem {
  "Дата оплаты / перемещения (для ДДС)": string,
  "Дата начисления (для ОПиУ)": string,
  "Счёт": string,
  "Тип операции": string,
  "Артикул": string,
  "Контрагент": string,
  "Статья": string,
  "Сумма": string,
  "Кабинет": string,
  "Комментарий": string
}