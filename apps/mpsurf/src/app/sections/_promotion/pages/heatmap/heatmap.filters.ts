import { IFiltersBox } from "../../../../models/filters-box";

export const HEATMAP_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'heatmapCategories',
      type: 'select',
      options: [],
      placeholder: 'Категория',
    },
    {
      id: 'heatmapSubjects',
      type: 'select',
      options: [],
      placeholder: 'Предмет',
    },
    {
      id: 'heatmapArticles',
      type: 'select',
      options: [],
      placeholder: 'Артикул',
    },
  ],
]