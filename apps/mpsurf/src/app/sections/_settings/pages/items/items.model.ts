export interface ISettingsItemsGridNestedTree {
  "key": number,
  "label": string,
  "data": string,
  "p_l": number,
  "d_l": number,
  "activity": number,
  "is_block": number,
  "pnl_name": string,
  "is_visible": number
}

export interface ISettingsItemsGridNested {
  key: string,
  label: string,
  data: string,
  expanded?: boolean,
  icon: string,
  children: ISettingsItemsGridNestedTree[]
}

export interface ISettingsItemsGrid {
  key: string,
  label: string,
  data: string,
  expanded: boolean,
  icon: string,
  children: ISettingsItemsGridNested[]
}
