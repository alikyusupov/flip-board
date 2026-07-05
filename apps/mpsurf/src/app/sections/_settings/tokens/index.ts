import { InjectionToken } from "@angular/core";

import { ISettingsService } from "../models";

export const SETTINGS_SERVICE_TOKEN = new InjectionToken<ISettingsService>('A token for settings service')
