import { IFiltersBox } from "../../../../models/filters-box";

export const REMAINS_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'remainsWarehouses',
      type: 'multi-select',
      options: [],
      placeholder: 'Склад',
    },
    {
      id: 'articles',
      type: 'multi-select',
      options: [],
      placeholder: 'Товар',
    },
    {
      id: 'goods_on_way',
      type: 'checkbox',
      options: [],
      placeholder: '',
      checkboxtext: 'Учитывать товары в пути',
      isChecked: false,
    },
  ],
]