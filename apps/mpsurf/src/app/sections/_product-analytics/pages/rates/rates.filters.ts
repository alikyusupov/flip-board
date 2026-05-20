import { IFiltersBox } from "../../../../models/filters-box";

export const RATES_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Артикул',
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
      id: 'brands',
      type: 'multi-select',
      options: [],
      placeholder: 'Бренд',
    },
    {
      id: 'tags',
      type: 'multi-select',
      options: [],
      placeholder: 'Ярлык',
    },
  ],
]

export const RATES_FILTERS_OZON: IFiltersBox[][] = [
  [
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Артикул',
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
      id: 'brands',
      type: 'multi-select',
      options: [],
      placeholder: 'Бренд',
    },
  ],
]
