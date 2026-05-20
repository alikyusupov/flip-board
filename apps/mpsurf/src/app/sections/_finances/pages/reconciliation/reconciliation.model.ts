export interface IReconciliationRow {
  "report_id": string,
  "start_date": string,
  "end_date": string,
  "sales_rub": number,
  "pay_for_good_rub": number,
  "penalties_sum": number,
  "allowances": number,
  "storage_cost_rub": number,
  "paid_acceptance_cost_rub": number,
  "other_withholding_rub": number,
  "logistic": number,
  "cashback_amount": number,
  "cashback_commission_change": number,
  "total_payable": number
}