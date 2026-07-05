import { InjectionToken } from "@angular/core";

import { IProductAnalyticsService } from "../models";

export const PRODUCT_ANALYTICS_SERVICE_TOKEN = new InjectionToken<IProductAnalyticsService>('A token for product analytics service')