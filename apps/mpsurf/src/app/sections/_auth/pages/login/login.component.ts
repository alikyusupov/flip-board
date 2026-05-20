import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkTableModule } from "@angular/cdk/table";
import { Component, DestroyRef, inject,OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_PROD_OLD, API_TEST_OLD, DIAL_CODES } from '@consts';
import { IShop } from '@models';
import { Store } from '@ngxs/store';
import { CarouselComponent } from '@ui-kit/carousel/carousel.component';
import { FlagDetectorPipe } from '@ui-kit/pipes/flag-detector.pipe';
import { TagColorPipe } from '@ui-kit/pipes/tag-color.pipe';
import { GetShops, SetSelectedShop } from 'app/actions/main.actions';
import { MainState } from 'app/states/main.state';
import { environment } from 'environments/environment';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { filter, switchMap } from 'rxjs';

import { LogIn, Register, YandexOAuthError, YandexOAuthSuccess } from '../../auth.actions';
import { AuthState } from '../../auth.state';
import { YandexOAuthService } from '../../services/yandex-oauth.service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule, 
    NzCheckboxModule, 
    NzFormModule, 
    NzInputModule, 
    NzSelectModule,
    NzDividerModule,
    NzInputNumberModule,
    CarouselComponent,
    NzTagModule, 
    TagColorPipe, 
    FlagDetectorPipe, 
    CdkTableModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class LoginComponent implements OnInit {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD_OLD;

  protected images = [
    { imageSrc: '/assets/images/carousel/mpSurf-slide-01.png', imageAlt: '' },
    { imageSrc: '/assets/images/carousel/mpSurf-slide-02.png', imageAlt: '' },
    { imageSrc: '/assets/images/carousel/mpSurf-slide-03.png', imageAlt: '' },
    { imageSrc: '/assets/images/carousel/mpSurf-slide-04.png', imageAlt: '' },
  ]

  protected DIAL_CODES = DIAL_CODES.sort((a, b) => a.code.localeCompare(b.code));

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _yandexOAuth = inject(YandexOAuthService);
  private readonly _notification = inject(NzNotificationService);

  private readonly $isAuthorized = this._store.select(AuthState.isAuthorized).pipe(takeUntilDestroyed(this._destroyRef), filter(isAuth => !!isAuth));
  private readonly $shops = this._store.select(MainState.shops).pipe(takeUntilDestroyed(this._destroyRef));

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    password: this.fb.control('', [Validators.required]),
    phoneNumberPrefix: this.fb.control('+7'),
    phoneNumber: this.fb.control('', [Validators.required]),
  });

  registerForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [
      Validators.required, 
      Validators.email
    ]),
    phoneNumberPrefix: this.fb.control('+7'),
    phone: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/)
    ]),
  });

  shops = signal<IShop[]>([]);

  isLoginFormVisible = signal(true);

  isRegsiterFormVisible = signal(false);

  isYandexLoading = signal(false);
  
  ngOnInit(): void {


    this.$isAuthorized.subscribe(() => {

      this._store.dispatch(
        new GetShops({ 
          method: 'POST', 
          action: 'getDataShopWB',
          endpoint: 'data',
          host: this.HOST,
        })
      )

      this.isLoginFormVisible.set(false);

    });

    this.$shops.subscribe(shoplist => {
      
      if(shoplist.length === 1) {
        this._store.dispatch(new SetSelectedShop(shoplist[0]));
        this._router.navigate(['../product-analytics/rates']);
      }
      else {
        this.shops.set(shoplist)
      }
    })
  }

  login(): void {
    if (this.validateForm.valid) {
      this._store.dispatch(new LogIn(
        {
          method: 'POST',
          action: 'login',
          endpoint: 'data',
          host: this.HOST,
          params: {
            password: this.validateForm.value['password'] as string,
            email: this.validateForm.value['phoneNumberPrefix'] + '' + this.validateForm.value['phoneNumber'] as string,

          }
        }
      ))
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  register(): void {

    if(this.registerForm.invalid){
      return
    }

    this._store.dispatch(new Register(
      {
        method: 'POST',
        action: 'login',
        endpoint: 'data',
        host: this.HOST,
        params: {
          password: this.validateForm.value['password'] as string,
          email: this.validateForm.value['phoneNumberPrefix'] + '' + this.validateForm.value['phoneNumber'] as string,

        }
      }
    ))
  }

  onSelectShop(shop: IShop): void {

    this._store.dispatch(new SetSelectedShop(shop))
    .subscribe(() => this._router.navigate(['../product-analytics/rates']))
  }

  switchToRegistration(): void {
    this.isRegsiterFormVisible.set(true);
    this.isLoginFormVisible.set(false);
  }

  onPhoneInput(controlName: 'phoneNumber' | 'phone'): void {
    const phoneControl = controlName === 'phoneNumber'
      ? this.validateForm.controls.phoneNumber
      : this.registerForm.controls.phone;
    const sanitizedValue = phoneControl.value.replace(/\D/g, '');

    if (sanitizedValue !== phoneControl.value) {
      phoneControl.setValue(sanitizedValue, { emitEvent: false });
    }
  }

  /**
   * Initiates Yandex OAuth login flow
   * Opens a popup window for user authentication
   */
  loginWithYandex(): void {
    this.isYandexLoading.set(true);

    this._yandexOAuth.authorize()
      .pipe(
        switchMap(oauthResult => {

          return this._yandexOAuth.getUserInfo(oauthResult.accessToken)
            .pipe(
              switchMap(userInfo => {
                // Dispatch success action with both OAuth result and user info
                return this._store.dispatch(new YandexOAuthSuccess(
                  {
                    accessToken: oauthResult.accessToken,
                    tokenType: oauthResult.tokenType,
                    expiresIn: oauthResult.expiresIn
                  },
                  userInfo
                ));
              })
            )
        }

        )
      )
      .subscribe({
        next: () => {
          this.isYandexLoading.set(false);
          this._store.dispatch(new LogIn(
            {
              method: 'POST',
              action: 'login',
              endpoint: 'data',
              host: this.HOST,
              params: {
                access_token: this._store.selectSnapshot(AuthState.token),
                password: '',
                email: ''
              }
            }
          ));
          this._notification.create('success', '', 'Успешная авторизация через Яндекс ID');
        },
        error: (error) => {
          this.isYandexLoading.set(false);
          this._store.dispatch(new YandexOAuthError(error.message || 'Ошибка авторизации'));
          this._notification.create('error', '', error.message || 'Ошибка авторизации через Яндекс ID');
        }
      });
  }

}
