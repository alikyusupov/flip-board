import { inject, InjectionToken, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngxs/store";
import { ProfileShopsState } from "app/sections/_profile/pages/shops/shops.state";
import { MainState } from "app/states/main.state";
import { filter, map, tap, withLatestFrom } from "rxjs";

export const CURRENCY = new InjectionToken<Signal<string>>('A token for currency', {
  factory: () => {
    const store = inject(Store);

    return toSignal(
      store.select(ProfileShopsState.shops).pipe(
        withLatestFrom(store.select(MainState.selectedShop)),
        filter(([shops, selectedShosp]) => shops.length > 0 && !!selectedShosp),
        tap(([shops, selectedShop]) => console.log(shops, selectedShop)),
        map(([shops, selectedShop]) => shops.find(shop => shop.id === selectedShop?.id)?.currency_name || ''),
      ),
      {
        initialValue: '',
      }
    );
  },
});