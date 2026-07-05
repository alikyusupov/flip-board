export interface IRecursiveData {
  data: Record<string, string | number | null>,
  expanded?: boolean,
  children?: IRecursiveData[]
}

export interface IPNLGridData {
  data: IRecursiveData[],
  columns: 
    {
      "field": string,
      "header": string
    }[]
}