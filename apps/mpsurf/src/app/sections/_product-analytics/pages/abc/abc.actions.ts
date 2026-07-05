import { IApiConfigDto } from "@models";

export class LoadAbcTable {
  static readonly type = '[ProductAnalyticsAbcState] load table row data';
  constructor(public dto: IApiConfigDto){}
}