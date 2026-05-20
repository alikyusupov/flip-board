import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IShop } from '@models';
import { Store } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { distinctUntilChanged, map } from 'rxjs';

import { Reset, SetSelectedShop } from './actions/main.actions';
import { LogOut } from './sections/_auth/auth.actions';
import { AuthState } from './sections/_auth/auth.state';
import { ThemeService } from './services/theme.service';
import { MainState } from './states/main.state';

@Component({
  selector: 'app-root',
  imports: [
    NzButtonModule, 
    NzIconModule, 
    NzMenuModule, 
    NzToolTipModule, 
    NzPageHeaderModule, 
    NzSpaceModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    NzSwitchModule, 
    ReactiveFormsModule, 
    AsyncPipe,
    NzSelectModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {

  private readonly _themeService = inject(ThemeService);
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  themeControl = new FormControl(false, {nonNullable: true});
  shopControl = new FormControl<null | number>(null, {nonNullable: true});

  theme$ = this._themeService.theme$;

  isCollapsed = false;
  lightTheme = true;

  shops$ = this._store.select(MainState.shops);

  selectedShop: IShop | null = null;

  shopId$ = this._store.select(MainState.selectedShop).pipe(takeUntilDestroyed(this. _destroyRef), map(shop => shop?.id))

  isAuthorized$ = this._store.select(AuthState.isAuthorized).pipe(takeUntilDestroyed(this._destroyRef));

  ngOnInit(): void {

    this.themeControl.valueChanges.subscribe(v => this._themeService.toggleMode(v ? 'dark' : 'light'));

    this.shopControl.valueChanges.pipe(distinctUntilChanged()).subscribe(shopId => {

      const shop = this._store.selectSnapshot(MainState.shops).find(shop => shop.id === shopId)!;

      this._store.dispatch(new SetSelectedShop(shop))

      if(!this._router.url.includes('rates')) {
        this._router.navigate(["product-analytics", "rates"])
      }
      else {
        this._router.navigate(["profile", "shops"])
      }
    })

    this._store.select(MainState.selectedShop).subscribe(shop => {
      if(shop) {
        this.shopControl.setValue(shop.id);
        this.selectedShop = shop;
      }
    })


  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this._store.dispatch([new LogOut(), new Reset()]);
    this._router.navigate(['auth/login']);

  }

  isAuthRoute(): boolean {
    return this._router.url.startsWith('/auth');
  }

}
