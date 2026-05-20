import { IFiltersBox } from "../../../../models/filters-box";

export const PNL_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'type_group',
      type: 'multi-button',
      options: [
        { value: 2, label: 'По неделям' },
        { value: 3, label: 'По месяцам' },
      ],
      placeholder: '',
      defaultValue: 3
    },
  ],
  [
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Артикул',
    },
    {
      id: 'subjects',
      type: 'multi-select',
      options: [],
      placeholder: 'Предмет',
    },
    {
      id: 'categoryPnl',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория собственная',
    },
    {
      id: 'myStatus',
      type: 'multi-select',
      options: [],
      placeholder: 'Статус',
    },
    {
      id: 'tags',
      type: 'multi-select',
      options: [],
      placeholder: 'Ярлык',
    },
    {
      id: 'realization_report',
      type: 'checkbox',
      options: [],
      placeholder: '',
      checkboxtext: 'Показать рекламу по артикулам (API РК Финансы)',
      isChecked: false,
    },
  ],
]