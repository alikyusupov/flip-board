import { IFiltersBox } from "app/models/filters-box";

export const ABC_FILTERS: IFiltersBox[][] = [
  [
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
      id: 'myStatus',
      type: 'multi-select',
      options: [],
      placeholder: 'Статус',
    },
    {
      id: 'categoryPnl',
      type: 'multi-select',
      options: [],
      placeholder: 'Категория собственная',
    },
    {
      id: 'tags',
      type: 'multi-select',
      options: [],
      placeholder: 'Ярлык',
    },
    {
      id: 'adv_oper',
      type: 'checkbox',
      options: [],
      placeholder: '',
      checkboxtext: 'Показать рекламу по API',
      isChecked: false,
    },
    {
      id: 'fbo_fbs',
      type: 'checkbox',
      options: [],
      placeholder: '',
      checkboxtext: 'Показать остатки FBO+FBS',
      isChecked: false,
    },
  ],
]