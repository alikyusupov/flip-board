import { ColDef } from 'ag-grid-community';

export const FINPARTNERS_COLUMN_DEFS: ColDef[] = [
  {
    headerName: 'Наименование',
    field: 'name',
    width: 200,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Оборот',
    field: 'sum_partners',
    width: 200,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Количество операций',
    field: 'count_operation',
    width: 200,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'ИНН',
    field: 'INN',
    width: 200,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'КПП',
    field: 'KPP',
    width: 200,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Расчетный счет',
    field: 'checking_account',
    width: 200,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Комментарии',
    field: 'description',
    width: 200,
    floatingFilter: false,
  },
  {
    headerName: 'Действия',
    icons: {
      sortAscending: '<i class="fa fa-sort-alpha-up"/>',
      sortDescending: '<i class="fa fa-sort-alpha-down"/>',
    },
    filter: false,
    autoHeaderHeight: true,
    width: 140,
  },
];