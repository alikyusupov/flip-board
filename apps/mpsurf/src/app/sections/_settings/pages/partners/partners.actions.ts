import { IApiConfigDto } from "@models";

export class LoadPartners {
  static readonly type = '[SettingsPartnersState] load table';
  constructor(public dto: IApiConfigDto){}
}