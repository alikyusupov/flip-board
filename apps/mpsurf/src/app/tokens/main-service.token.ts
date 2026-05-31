import { InjectionToken } from "@angular/core";
import { IMainService } from "@models";

export const MAIN_SERVICE_TOKEN = new InjectionToken<IMainService>('A token for main service');
