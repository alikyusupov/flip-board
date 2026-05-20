import { endOfDay, endOfMonth, endOfQuarter, endOfWeek,endOfYear, startOfDay, startOfMonth, startOfQuarter, startOfWeek, startOfYear, subDays, subMonths, subQuarters, subWeeks, subYears } from "date-fns";


export const DATE_PRESETS: Record<string, Date[]> | Record<string, () => Date[]> = {

  'Прошлый год': [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))],
  'Прошлый квартал': [startOfQuarter(subQuarters(new Date(), 1)), endOfQuarter(subQuarters(new Date(), 1))],
  'Прошлый месяц': [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  'Прошлая неделя': [startOfWeek(subWeeks(new Date(), 1), {weekStartsOn: 1}), endOfWeek(subWeeks(new Date(), 1), {weekStartsOn: 1})],

  'Вчера': [startOfDay(subDays(new Date(), 1)), endOfDay(subDays(new Date(), 1))],
  'Сегодня': [startOfDay(new Date()), endOfDay(new Date())],

  'Текущая неделя': [startOfWeek(new Date(), {weekStartsOn: 1}), endOfWeek(new Date(), {weekStartsOn: 1})],
  'Текущий месяц': [startOfMonth(new Date()), endOfMonth(new Date())],
  'Текущий квартал': [startOfQuarter(new Date()), endOfQuarter(new Date())],
  'Текущий год': [startOfYear(new Date()), endOfYear(new Date())],

}

