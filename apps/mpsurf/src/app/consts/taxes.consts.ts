import { INzOption } from "@models";

export const TAXES_TYPES: INzOption<number>[] = [
  {
    label: 'Не установлено',
    value: 0
  },
  {
    label: 'УСН "Доходы"',
    value: 1
  },
  {
    label: 'УСН "Доходы - расходы" (вручную через Операции)',
    value: 5
  },
  {
    label: 'НПД "Самозанятые"',
    value: 2
  },
  {
    label: 'Другой тип (вручную через Операции)',
    value: 6
  },
];