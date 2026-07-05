import { IFiltersBox } from "../../../../models/filters-box";

export const CLUSTERS_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'myStatus',
      type: 'multi-select',
      options: [],
      placeholder: 'Статус',
    },
    {
      id: 'categoryPnl',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'tags',
      type: 'multi-select',
      options: [],
      placeholder: 'Ярлык',
    },
  ],
]