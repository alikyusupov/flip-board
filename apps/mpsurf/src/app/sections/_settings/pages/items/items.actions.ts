import { IApiConfigDto } from "@models";

export class LoadItemsGrid {
  static readonly type = '[SettingsItemsState] load grid';
  constructor(public dto: IApiConfigDto){}
}