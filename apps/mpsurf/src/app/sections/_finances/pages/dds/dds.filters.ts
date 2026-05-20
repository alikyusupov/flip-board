import { IFiltersBox } from "@models";

export const DDS_FILTERS: IFiltersBox[][] = [
  [
    {
      id: 'type_group',
      type: 'multi-button',
      options: [
        { value: 2, label: 'По неделям' },
        { value: 3, label: 'По месяцам' },
      ],
      placeholder: '',
      defaultValue: 2
    },
  ],
]