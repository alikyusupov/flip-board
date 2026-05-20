import { IFiltersBox } from "app/models/filters-box";

export const SALES_FILTERS_WB: IFiltersBox[][] = [
  [
    {
      id: 'type',
      type: 'multi-button',
      options: [
        { value: 2, label: 'Таблица' },
        { value: 1, label: 'Лента' },
      ],
      placeholder: '',
      defaultValue: 2
    },
    {
      id: 'dateType',
      type: 'multi-button',
      options: [
        { value: '1', label: 'По дням', },
        { value: '2', label: 'По неделям', },
        { value: '3', label: 'По месяцам', },
      ],
      placeholder: '',
      defaultValue: '1'
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
      defaultValue: 'article'
    },
  ],
  [
    {
      id: 'salesGoods',
      type: 'multi-select',
      options: [],
      placeholder: 'Товар',
    },
    {
      id: 'salesWarehouses',
      type: 'multi-select',
      options: [],
      placeholder: 'Склад',
    },
    {
      id: 'salesCategories',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'salesSubjects',
      type: 'multi-select',
      options: [],
      placeholder: 'Предмет',
    },
    {
      id: 'tags',
      type: 'multi-select',
      options: [],
      placeholder: 'Ярлык',
    },
  ],
]

export const SALES_FILTERS_OZON: IFiltersBox[][] = [
  [
    {
      id: 'type',
      type: 'multi-button',
      options: [
        { value: 2, label: 'Таблица' },
        { value: 1, label: 'Лента' },
      ],
      placeholder: '',
      defaultValue: 2
    },
    {
      id: 'dateType',
      type: 'multi-button',
      options: [
        { value: '1', label: 'По дням', },
        { value: '2', label: 'По неделям', },
        { value: '3', label: 'По месяцам', },
      ],
      placeholder: '',
      defaultValue: '1'
    },
    {
      id: 'grouping',
      type: 'select',
      options: [
        { label: 'Размеру', value: 'size' },
        { label: 'Предмету', value: 'subject' },
        { label: 'Собственной категории', value: 'category_pnl' },
      ],
      placeholder: '',
      withPrefix: true,
      prefix: 'Группировка по',
      defaultValue: 'size'
    },
  ],
  [
    {
      id: 'salesGoods',
      type: 'multi-select',
      options: [],
      placeholder: 'Товар',
    },
    {
      id: 'salesCategories',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'myStatus',
      type: 'multi-select',
      options: [],
      placeholder: 'Статус',
    },
    {
      id: 'brands',
      type: 'multi-select',
      options: [],
      placeholder: 'Бренд',
    },
  ],
]