import { ColDef } from 'ag-grid-community';
import { TAXES_TYPES } from 'app/consts/taxes.consts';

import { TaxControlsComponent } from '../../dialogs/tax-dialog/components/tax-controls/tax-controls.component';
import { ITaxItem } from "./shops.model";


export const TAX_COL_DEF: ColDef<ITaxItem>[] = [
  {
    headerName: 'Дата корректировки',
    cellEditor: 'agDateCellEditor',
    editable: true,
    field: 'date',
    sortable: true,
    resizable: true,
    width: 200,
    valueFormatter: (params) => `✎ ${params.value}`,
  },
  {
    headerName: 'Тип налога',
    cellEditor: 'agSelectCellEditor',
    singleClickEdit : true,
    cellEditorParams: {
      values: [
        'Не установлено',

        'УСН "Доходы"',

        'УСН "Доходы - расходы" (вручную через Операции)',

        'НПД "Самозанятые"',

        'Другой тип (вручную через Операции)',

      ],
      defaultValue: 'Не установлено',
    },
    valueFormatter: params => {
      const tax = TAXES_TYPES.find(t => t.value === params.value || t.label === params.value);
      return `✎ ${tax?.label}`;
    },
    field: 'tax_type',
    sortable: true,
    resizable: true,
    editable: true,
    width: 200,
  },
  {
    headerName: 'Налог, %',
    field: 'tax_percent',
    sortable: true,
    resizable: true,
    editable: true,
    width: 130,
    singleClickEdit : true,
    valueFormatter: (params) => `✎ ${params.value}`,
  },
  {
    headerName: 'НДС, %',
    field: 'nds_percent',
    sortable: true,
    resizable: true,
    editable: true,
    width: 130,
    singleClickEdit : true,
    valueFormatter: (params) => `✎ ${params.value}`,
  },
  {
    headerName: '',
    width: 40,
    cellRenderer: TaxControlsComponent,
  },
];