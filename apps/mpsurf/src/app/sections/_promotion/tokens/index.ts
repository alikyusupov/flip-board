import { InjectionToken } from "@angular/core";

import { IPromotionService } from "../models";

export const PROMOTION_SERVICE_TOKEN = new InjectionToken<IPromotionService>('A token for promotion service')
