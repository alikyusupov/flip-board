import { InjectionToken } from "@angular/core";

import { IProfileService } from "../models";

export const PROFILE_SERVICE_TOKEN = new InjectionToken<IProfileService>('A token for profile service')