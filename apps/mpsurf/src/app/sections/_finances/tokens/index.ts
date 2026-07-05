import { InjectionToken } from "@angular/core";

import { IFinancesService } from "../models";


export const FINANCES_SERVICE_TOKEN = new InjectionToken<IFinancesService>('A token for finances service')