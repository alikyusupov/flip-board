import { DecimalPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { getCurrencyIcon } from 'app/utils';

const decimalPipe = new DecimalPipe('ru-RU')

export const RECONCILIATION_COLUMNS_DEFS: ColDef[] = [
  {
    headerName: '№ отчета',
    field: 'report_id',
    width: 150,
    pinned: 'left',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Дата начала',
    field: 'start_date',
    width: 150,
    pinned: 'left',
    filter: 'agDateColumnFilter',
  },
  {
    headerName: 'Дата конца',
    field: 'end_date',
    width: 150,
    pinned: 'left',
    filter: 'agDateColumnFilter',
  },
  {
    headerName: `Продажа, ${getCurrencyIcon()}`,
    field: 'sales_rub',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `К перечислению за товар, ${getCurrencyIcon()}`,
    field: 'pay_for_good_rub',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Логистика, ${getCurrencyIcon()}`,
    field: 'logistic',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Штрафы, ${getCurrencyIcon()}`,
    field: 'penalties_sum',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Доплаты, ${getCurrencyIcon()}`,
    field: 'allowances',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Стоимость хранения, ${getCurrencyIcon()}`,
    field: 'storage_cost_rub',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {

    headerName: `Стоимость платной приемки, ${getCurrencyIcon()}`,
    field: 'paid_acceptance_cost_rub',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Прочие удержания/выплаты, ${getCurrencyIcon()}`,
    field: 'other_withholding_rub',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Стоимость участия в программе лояльности, ${getCurrencyIcon()}`,
    field: 'cashback_commission_change',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Сумма удержанная за начисленные баллы программы лояльности, ${getCurrencyIcon()}`,
    field: 'cashback_amount',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
  {
    headerName: `Итого к оплате, ${getCurrencyIcon()}`,
    field: 'total_payable',
    width: 150,
    filter: 'agNumberColumnFilter',
    headerClass: 'header-centered',
    valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
  },
];