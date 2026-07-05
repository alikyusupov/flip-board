import { InjectionToken } from "@angular/core";

import { IPlanningService } from "../models";

export const PLANNING_SERVICE_TOKEN = new InjectionToken<IPlanningService>('A token for planning service')