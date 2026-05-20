
export type FilterType = 'multi-button' | 'multi-select' | 'select' | 'checkbox';

export interface IFilterOption<T = string | number > { 
  value: T, 
  label: string 
}

export interface IFiltersBox {
  id: string,
  type: FilterType,
  options: IFilterOption[],
  placeholder: string,
  withPrefix?: boolean,
  prefix?: string,
  selectLabel?: string,
  isChecked?: boolean,
  checkboxtext?: string,
  defaultValue?: string | number
}