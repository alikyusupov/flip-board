import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'product-analytics',
    loadComponent: () => import('../app/sections/_product-analytics/product-analytics.component').then(m => m.ProductAnalyticsComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'rates',
        loadComponent: () => import('../app/sections/_product-analytics/pages/rates/rates.component').then(m => m.RatesComponent),
      },
      {
        path: 'rnp',
        loadComponent: () => import('../app/sections/_product-analytics/pages/rnp/rnp.component').then(m => m.RnpComponent),
      },
      {
        path: 'orders',
        loadComponent: () => import('../app/sections/_product-analytics/pages/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'sales',
        loadComponent: () => import('../app/sections/_product-analytics/pages/sales/sales.component').then(m => m.SalesComponent),
      },
      {
        path: 'abc',
        loadComponent: () => import('../app/sections/_product-analytics/pages/abc/abc.component').then(m => m.AbcComponent),
      }
    ]
  },
  {
    path: 'finances',
    loadComponent: () => import('../app/sections/_finances/finances.component').then(m => m.FinancesComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'plan-fact',
        loadComponent: () => import('./sections/_finances/pages/plan-fact/plan-fact.component').then(m => m.PlanFactComponent),
      },
      {
        path: 'dds',
        loadComponent: () => import('./sections/_finances/pages/dds/dds.component').then(m => m.DdsComponent),
      },
      {
        path: 'pnl',
        loadComponent: () => import('./sections/_finances/pages/pnl/pnl.component').then(m => m.PnlComponent),
      },
      {
        path: 'operations',
        loadComponent: () => import('./sections/_finances/pages/operations/operations.component').then(m => m.OperationsComponent),
      },
      {
        path: 'reconciliation',
        loadComponent: () => import('./sections/_finances/pages/reconciliation/reconciliation.component').then(m => m.ReconciliationComponent),
      }
    ]
  },
  {
    path: 'promotion',
    loadComponent: () => import('../app/sections/_promotion/promotion.component').then(m => m.PromotionComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'drr',
        loadComponent: () => import('./sections/_promotion/pages/drr/drr.component').then(m => m.DrrComponent),
      },
      {
        path: 'stats',
        loadComponent: () => import('./sections/_promotion/pages/stats/stats.component').then(m => m.StatsComponent),
      },
      {
        path: 'heatmap',
        loadComponent: () => import('./sections/_promotion/pages/heatmap/heatmap.component').then(m => m.HeatmapComponent),
      },
    ]
  },
  {
    path: 'planning',
    loadComponent: () => import('../app/sections/_planning/planning.component').then(m => m.PlanningComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'remains',
        loadComponent: () => import('./sections/_planning/pages/remains/remains.component').then(m => m.RemainsComponent),
      },
      {
        path: 'clusters',
        loadComponent: () => import('./sections/_planning/pages/clusters/clusters.component').then(m => m.ClustersComponent),
      },
      {
        path: 'costprice',
        loadComponent: () => import('./sections/_planning/pages/costprice/costprice.component').then(m => m.CostpriceComponent),
      },
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('../app/sections/_settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'items',
        loadComponent: () => import('./sections/_settings/pages/items/items.component').then(m => m.ItemsComponent),
      },
      {
        path: 'partners',
        loadComponent: () => import('./sections/_settings/pages/partners/partners.component').then(m => m.PartnersComponent),
      },
    ]
  },
  {
    path: 'profile',
    loadComponent: () => import('../app/sections/_profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'shops',
        loadComponent: () => import('../app/sections/_profile/pages/shops/shops.component').then(m => m.ShopsComponent),
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('../app/sections/_auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('../app/sections/_auth/pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'yandex-callback',
        loadComponent: () => import('../app/sections/_auth/yandex-callback/yandex-callback.component').then(m => m.YandexCallbackComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'product-analytics/rates',
    pathMatch: 'full'
  },
];
