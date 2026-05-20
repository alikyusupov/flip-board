import { DecimalPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';

import { ButtonRendererComponent } from './buttons/button-renderer.component';
import { PlanFactControlsRendererComponent } from './buttons/controls-renderer.component';

const decimalPipe = new DecimalPipe('ru-RU')

export const PLAN_FACT_COLUMN_DEFS: ColDef[] = [
    {
        headerName: '',
        width: 85,
        cellRenderer: ButtonRendererComponent,
        cellStyle: { paddingLeft: '0px', paddingRight: '0px' },
    },
    {
        headerName: 'Дата формирования плана',
        field: 'created_at',
        width: 160,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Название плана',
        field: 'plan_name',
        width: 160,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Месяц планирования',
        field: 'dateFrom',
        width: 160,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Цель',
        field: 'type',
        width: 160,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Способ планироования',
        field: 'method',
        width: 160,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: `Цель в `,
        field: 'goal_rub',
        width: 162,
        filter: 'agNumberColumnFilter',
        valueFormatter: v => decimalPipe.transform(v.value, '1.0-0') as string
    },
    {
        headerName: 'Статус',
        field: 'status',
        width: 100,
    },
    {
        headerName: '',
        width: 140,
        cellRenderer: PlanFactControlsRendererComponent,
    },
]

export const MODAL_COLUMNS_DEFS: ColDef[] = [
    {
        headerName: '',
        field: 'selection',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        filter: false,
        width: 60,
        checkboxSelection: true,
    },
    {
        headerName: 'Планируемая сумма (введите значение)',
        field: 'plan_sum',
        cellStyle: { background: '#f0f3f5' },
        valueFormatter: (params) => `${decimalPipe.transform(params.value, '1.0-0') || 0}  ✎`,
        editable: true,
        cellEditor: "agNumberCellEditor",
    },
    {
      headerName: 'Артикул МП',
      field: 'nmid',
      sortable: true,
      resizable: true,
      width: 150,
      filter: 'agTextColumnFilter',
      suppressSizeToFit: true,
    },
    {
      headerName: 'Артикул поставщика',
      field: 'SKU',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 150,
    },
    {
      headerName: 'Категория МП',
      field: 'category',
      sortable: true,
      resizable: true,
      width: 150,
      filter: true,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Предмет',
      field: 'subject',
      sortable: true,
      resizable: true,
      width: 150,
      filter: true,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Бренд',
      field: 'brand',
      sortable: true,
      resizable: true,
      width: 150,
      wrapText: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Категория собственная',
      field: 'category_pnl',
      sortable: false,
      resizable: true,
      width: 150,
      filter: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: 'Статус',
      field: 'status_name',
      editable: true,
      sortable: true,
      resizable: true,
      width: 150,
      flex: 0,
      filter: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [],
      },
    },
  ];