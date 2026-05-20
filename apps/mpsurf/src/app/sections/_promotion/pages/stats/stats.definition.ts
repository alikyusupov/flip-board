import { DecimalPipe } from '@angular/common';
import { UnitPipe } from '@ui-kit/pipes/unit.pipe';
import { ColDef } from 'ag-grid-community';

import { IStatsListItem } from './stats.model';

const decimalPipe = new DecimalPipe('ru-RU');
const unitPipe = new UnitPipe();

export function genarateColumnDefs(isOzon: boolean, currency: string): ColDef[] {
  const COMMON_DEFS: ColDef[] = [
    {
      field: 'date',
      headerName: 'Дата РК',
      headerClass: 'header-centered',
      sortable: true,
      filter: 'agTextColumnFilter',
      width: 180,
      cellStyle: { textAlign: 'left' },
    },
    {
      field: 'advertId',
      headerName: 'ID Кампании',
      headerClass: 'header-centered',
      sortable: true,
      filter: 'agTextColumnFilter',
      width: 120,
      cellStyle: { textAlign: 'left' },
    },
    {
      field: 'nmId',
      headerName: 'Артикул МП',
      headerClass: 'header-centered',
      sortable: true,
      filter: 'agTextColumnFilter',
      width: 120,
      cellStyle: { textAlign: 'left' },
    },
    {
      field: 'views',
      headerName: 'Просмотры, шт ',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120
    },
    {
      field: 'clicks',
      headerName: 'Клики, шт ',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120
    },
    {
      field: 'atbs',
      headerName: 'Добавлено в корзину, шт',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120
    },
    {
      field: 'shks',
      headerName: 'Заказы из РК Статистики, шт',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120,
      headerTooltip: 'Заказы только по данной РК'
    },
    {
      field: 'sum_price',
      headerName:`Заказы из РК Статистики, ${currency}`,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120,
      headerTooltip: 'Заказы только по данной РК'
    },
    {
      field: 'sum',
      headerName: `Затраты, ${currency}`,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 120,
      headerTooltip: 'Затраты из API Статистика не бьются с финансовыми списаниями'
    },
    {
      field: 'cr',
      headerName: 'CR',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      width: 86,
      headerTooltip: 'Это отношение количества заказов к общему количеству посещений (просмотров) кампании'
    },
    {
      field: 'cpc',
      headerName: 'CPC',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string,
      width: 86,
      headerTooltip: 'Средняя стоимость клика'
    },
    {
      field: 'ctr',
      headerName: 'CTR',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: v => unitPipe.transform(decimalPipe.transform(v.value, '1.0-1'), 'percent'),
      width: 86,
      headerTooltip: 'Показатель кликабельности. Отношение числа кликов к количеству показов'
    },
  ];
  const ONLY_WB_DEFS: ColDef[] = [
    {
      field: 'name',
      headerName: 'Название рекламы',
      headerClass: 'header-centered',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 177,
      cellStyle: { textAlign: 'left' },
    },
    {
      field: 'adv_type',
      headerName: 'Тип',
      headerClass: 'header-centered',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 120,
      cellStyle: { textAlign: 'left' },
    },
  ];

  return isOzon ? COMMON_DEFS : [COMMON_DEFS[0]].concat(ONLY_WB_DEFS).concat(COMMON_DEFS.slice(1))
}

export function generateSummary(data: IStatsListItem[]) {
  const rows = Array.isArray(data) ? data : [];
  const watchCountAgg = rows.map(row => +(row?.views || 0)).reduce((prev, curr) => prev + curr, 0);
  const clickCountAgg = rows.map(row => +(row?.clicks || 0)).reduce((prev, curr) => prev + curr, 0);
  const addedToCartCountAgg =  rows.map(row => +(row?.atbs || 0)).reduce((prev, curr) => prev + curr, 0);
  const ordersCountAgg =  rows.map(row => +(row?.shks || 0)).reduce((prev, curr) => prev + curr, 0);
  const ordersSumAgg = rows.map(row => +(row?.sum_price || 0)).reduce((prev, curr) => prev + curr, 0);
  const expensesSumAgg =  rows.map(row => +(row?.sum || 0)).reduce((prev, curr) => prev + curr, 0);

  return [
    {
      date: 'Итого',
      views: watchCountAgg,
      clicks: clickCountAgg,
      atbs: addedToCartCountAgg,
      shks: ordersCountAgg,
      sum_price: ordersSumAgg,
      sum: expensesSumAgg,
      cr: (ordersCountAgg * 10000)/watchCountAgg,
      cpc: expensesSumAgg / clickCountAgg,
      ctr: (clickCountAgg * 100) / watchCountAgg,
    },
  ]
}