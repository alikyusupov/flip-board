export interface ITableItemGroupColumn {
  name: string,
  width: number,
  align: string,
  headerCenter: boolean
}

export interface ITableItemGroup {

  type: "general" | "range";
  name?: string;
  columns: string[] | ITableItemGroupColumn[]

}

export interface ITableItemData {

  ['Показатели']: string,
  ['Итого']: number,
  [key: string]: string | number
  
}


export interface ITableItem {
  id: string;
  groups: ITableItemGroup[],
  table: ITableItemData[]
}

export interface IRnpTable {
  data: ITableItem[];
  pagination: number;
  totalPagesCount: number;
}