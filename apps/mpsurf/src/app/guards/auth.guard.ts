import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "app/sections/_auth/auth.state";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = () => {

  const store = inject(Store);
  const router = inject(Router);

  const isAuthenticated$ = store.select(AuthState.isAuthorized);

  return isAuthenticated$.pipe(
    map(isAuth => {
      if(isAuth) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    }),
    catchError(() => of(false))
  )
};