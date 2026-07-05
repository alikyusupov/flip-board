import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import ru from '@angular/common/locales/ru';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store'; 
import Aura from '@primeuix/themes/aura';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { environment } from 'environments/environment';
import { NZ_DATE_CONFIG,provideNzI18n, ru_RU } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { withNgxsResetPlugin } from 'ngxs-reset-plugin';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { TokeniserInterceptor } from './interceptors/tokeniser.interceptor';
import { AuthState } from './sections/_auth/auth.state';
import { AuthService } from './sections/_auth/services/auth.service';
import { AuthMockService } from './sections/_auth/services/auth-mock.service';
import { AUTH_SERVICE_TOKEN } from './sections/_auth/tokens';
import { FinancesDdsState } from './sections/_finances/pages/dds/dds.state';
import { FinancesOperationsState } from './sections/_finances/pages/operations/operations.state';
import { FinancesPlanFactState } from './sections/_finances/pages/plan-fact/plan-fact.state';
import { FinancesPnlState } from './sections/_finances/pages/pnl/pnl.state';
import { FinancesReconciliationState } from './sections/_finances/pages/reconciliation/reconciliation.state';
import { FinancesService } from './sections/_finances/services/finances-api.service';
import { FinancesMockService } from './sections/_finances/services/finances-api-mock.service';
import { FINANCES_SERVICE_TOKEN } from './sections/_finances/tokens';
import { PlanningClustersState } from './sections/_planning/pages/clusters/clusters.state';
import { PlanningCostpriceState } from './sections/_planning/pages/costprice/costprice.state';
import { PlanningRemainsState } from './sections/_planning/pages/remains/remains.state';
import { PlanningService } from './sections/_planning/services/planning-api.service';
import { PlanningMockService } from './sections/_planning/services/planning-api-mock.service';
import { PLANNING_SERVICE_TOKEN } from './sections/_planning/tokens';
import { ProductAnalyticsAbcState } from './sections/_product-analytics/pages/abc/abc.state';
import { ProductAnalyticsOrdersState } from './sections/_product-analytics/pages/orders/orders.state';
import { ProductAnalyticsRatesState } from "./sections/_product-analytics/pages/rates/rates.state";
import { ProductAnalyticsRnpState } from './sections/_product-analytics/pages/rnp/rnp.state';
import { ProductAnalyticsSalesState } from './sections/_product-analytics/pages/sales/sales.state';
import { ProductAnalyticsService } from './sections/_product-analytics/services/product-analytics-api.service';
import { ProductAnalyticsMockService } from './sections/_product-analytics/services/product-analytics-api-mock.service';
import { PRODUCT_ANALYTICS_SERVICE_TOKEN } from './sections/_product-analytics/tokens';
import { ProfileShopsState } from './sections/_profile/pages/shops/shops.state';
import { ProfileService } from './sections/_profile/services/profile.service';
import { ProfileApiMockService } from './sections/_profile/services/profile-mock.service';
import { PROFILE_SERVICE_TOKEN } from './sections/_profile/tokens';
import { PromotionDdrState } from './sections/_promotion/pages/drr/drr.state';
import { PromotionHeatmapState } from './sections/_promotion/pages/heatmap/heatmap.state';
import { PromotionStatsState } from './sections/_promotion/pages/stats/stats.state';
import { PromotionService } from './sections/_promotion/services/promotion-api.service';
import { PromotionMockService } from './sections/_promotion/services/promotion-api-mock.service';
import { PROMOTION_SERVICE_TOKEN } from './sections/_promotion/tokens';
import { SettingsItemsState } from './sections/_settings/pages/items/items.state';
import { SettingsPartnersState } from './sections/_settings/pages/partners/partners.state';
import { SettingsService } from './sections/_settings/services/settings-api.service';
import { SettingsMockService } from './sections/_settings/services/settings-api-mock.service';
import { SETTINGS_SERVICE_TOKEN } from './sections/_settings/tokens';
import { GlobalDateRangeService } from './services/global-date-range.service';
import { MainService } from './services/main.service';
import { MainMockService } from './services/main-mock.service';
import { MainState } from './states/main.state';
import { MAIN_SERVICE_TOKEN } from './tokens';




registerLocaleData(ru);

ModuleRegistry.registerModules([AllCommunityModule]);

const antDesignIcons = AllIcons as Record<string, IconDefinition>;
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
          preset: Aura
      }
    }),
    {
      provide: NZ_DATE_CONFIG,
        useValue: {
          firstDayOfWeek: 1
      }
    },
    {
      provide: PRODUCT_ANALYTICS_SERVICE_TOKEN,
      useClass: !environment.isMock ? ProductAnalyticsService : ProductAnalyticsMockService
    },
    {
      provide: PROFILE_SERVICE_TOKEN,
      useClass: !environment.isMock ? ProfileService : ProfileApiMockService
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: !environment.isMock ? AuthService : AuthMockService
    },
    {
      provide: MAIN_SERVICE_TOKEN,
      useClass: !environment.isMock ? MainService : MainMockService
    },
    {
      provide: FINANCES_SERVICE_TOKEN,
      useClass: !environment.isMock ? FinancesService : FinancesMockService
    },
    {
      provide: PROMOTION_SERVICE_TOKEN,
      useClass: !environment.isMock ? PromotionService : PromotionMockService
    },
    {
      provide: PLANNING_SERVICE_TOKEN,
      useClass: !environment.isMock ? PlanningService : PlanningMockService
    },
    {
      provide: SETTINGS_SERVICE_TOKEN,
      useClass: !environment.isMock ? SettingsService : SettingsMockService
    },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(ru_RU),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([TokeniserInterceptor])),
    GlobalDateRangeService,
    provideStore([
      AuthState, 
      MainState,
      //PRODUCT ANALYTICS
      ProductAnalyticsRatesState,
      ProductAnalyticsRnpState,
      ProductAnalyticsOrdersState,
      ProductAnalyticsSalesState,
      ProductAnalyticsAbcState,
      //PROFILE
      ProfileShopsState,
      //FINANCES
      FinancesDdsState,
      FinancesPnlState,
      FinancesOperationsState,
      FinancesReconciliationState,
      FinancesPlanFactState,
      //PROMOTION
      PromotionDdrState,
      PromotionStatsState,
      PromotionHeatmapState,
      //PLANNING
      PlanningRemainsState,
      PlanningClustersState,
      PlanningCostpriceState,
      //SETTINGS
      SettingsItemsState,
      SettingsPartnersState
    ], withNgxsReduxDevtoolsPlugin(), withNgxsResetPlugin()),
  ]
};
