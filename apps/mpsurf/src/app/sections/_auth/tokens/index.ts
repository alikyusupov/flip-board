import { InjectionToken } from "@angular/core";

import { IAuthService } from "../models";

export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthService>('A token for auth service')