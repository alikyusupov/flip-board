import { IFiltersBox } from "app/models/filters-box";

export const RNP_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'dateType',
      type: 'multi-button',
      options: [
        { value: 1, label: 'По дням' },
        { value: 2, label: 'По неделям' },
        { value: 3, label: 'По месяцам' },
      ],
      placeholder: '',
      defaultValue: 1
    },
  ],
  [
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Товар',
    },
    {
      id: 'categoryPnl',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'subjects',
      type: 'multi-select',
      options: [],
      placeholder: 'Предмет',
    },
     {
      id: 'imtIds',
      type: 'multi-select',
      options: [],
      placeholder: 'ID склейки',
    },
  ],
]

export const RNP_FILTERS_OZON: IFiltersBox[][] = [
  [
    {
      id: 'dateType',
      type: 'multi-button',
      options: [
        { value: 1, label: 'По дням' },
        { value: 2, label: 'По неделям' },
        { value: 3, label: 'По месяцам' },
      ],
      placeholder: '',
      defaultValue: 1
    },
  ],
  [
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Товар',
    },
    {
      id: 'categoryPnl',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'subjects',
      type: 'multi-select',
      options: [],
      placeholder: 'Предмет',
    },
  ],
]