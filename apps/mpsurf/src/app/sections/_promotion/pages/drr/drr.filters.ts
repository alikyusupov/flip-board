import { IFiltersBox } from "../../../../models/filters-box";

export const DRR_FILTERS: IFiltersBox[][] = [
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
    {
      id: 'grouping',
      type: 'select',
      options: [
        { label: 'Артикулу', value: 'article' },
        { label: 'Размеру', value: 'size' },
        { label: 'Бренду', value: 'brand' },
        { label: 'Предмету', value: 'subject' },
        { label: 'Собственной категории', value: 'category_pnl' },
      ],
      placeholder: '',
      withPrefix: true,
      prefix: 'Группировка по',
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
      id: 'imtIds',
      type: 'multi-select',
      options: [],
      placeholder: 'ID склейки',
    },
  ],
]
