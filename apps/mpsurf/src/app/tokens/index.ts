import { inject, InjectionToken, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { IMainService, Marketplace } from "@models";
import { Store } from "@ngxs/store";
import { distinctUntilChanged, map } from "rxjs";

interface MainStateSlice {
  MainState?: {
    selectedShop?: {
      marketplace?: number;
    } | null;
  };
};

const marketplaceFromId = (marketplaceId?: number): Marketplace => {
  switch (marketplaceId) {
    case 1:
      return Marketplace.WB;
    case 2:
      return Marketplace.OZON;
    case 3:
      return Marketplace.YANDEX;
    default:
      return Marketplace.UNKNOWN;
  }
};

export const MAIN_SERVICE_TOKEN = new InjectionToken<IMainService>('A token for main service');

export const MARKETPLACE = new InjectionToken<Signal<Marketplace>>('A token for marketplace', {
  factory: () => {
    const store = inject(Store);
    const selectedShopSelector = (state: MainStateSlice) => state.MainState?.selectedShop;

    return toSignal(
      store.select(selectedShopSelector).pipe(
        map((shop) => marketplaceFromId(shop?.marketplace)),
        distinctUntilChanged()
      ),
      {
        initialValue: marketplaceFromId(store.selectSnapshot(selectedShopSelector)?.marketplace),
      }
    );
  },
});
