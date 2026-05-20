/* eslint-disable @typescript-eslint/no-this-alias */
import { inject, Injectable } from "@angular/core";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NzNotificationService } from "ng-zorro-antd/notification";

import { LogIn, LogOut, YandexOAuthError, YandexOAuthSuccess } from "./auth.actions";
import { IAuthResponse, IYandexUserInfo } from "./models"
import { AUTH_SERVICE_TOKEN } from "./tokens";

export interface AuthStateModel {
  isLoading: boolean,
  status: ApiRequestStateType,
  isAuthorized: boolean,
  token: string,
  yandexUser: IYandexUserInfo | null,
  authProvider: 'phone' | 'yandex' | null,
}


@State<AuthStateModel>({
  name: 'AuthState',
  defaults: {
    isLoading: false,
    status: 'success',
    isAuthorized: sessionStorage.getItem('isAuthorized') == 'true',
    token: '',
    yandexUser: null,
    authProvider: null,
  }
})
@Injectable()
export class AuthState{

  private readonly authService = inject(AUTH_SERVICE_TOKEN);
  private readonly _notification = inject(NzNotificationService)

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static status(state: AuthStateModel): ApiRequestStateType {
    return state.status
  }

  @Selector()
  static isAuthorized(state: AuthStateModel): boolean {
    return state.isAuthorized
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token
  }

  @Selector()
  static yandexUser(state: AuthStateModel): IYandexUserInfo | null {
    return state.yandexUser
  }

  @Selector()
  static authProvider(state: AuthStateModel): 'phone' | 'yandex' | null {
    return state.authProvider
  }

  @Action(LogIn)
  login(ctx: StateContext<AuthStateModel>, { dto }: LogIn ) {

    ctx.patchState({ isLoading: true, isAuthorized: false, token: '' });

    const self = this;

    this.authService.login(dto)
      .subscribe({
        next(res: IAuthResponse) {

          sessionStorage.setItem('isAuthorized', `${!res.is_error}`);
          sessionStorage.setItem('token', res.token);

          if(res.is_error){
            self._notification.create('error', '', res.msg)
          }

          ctx.patchState({ 
            isLoading: false, 
            isAuthorized: !res.is_error, 
            status: res.is_error ? 'error' : 'success', 
            token: sessionStorage.getItem('token') || '',
            authProvider: 'phone',
          });
        },
        error() {
          ctx.patchState({ 
            isLoading: false,
            status: 'error',
          });
        },
      })
  }

  @Action(YandexOAuthSuccess)
  yandexOAuthSuccess(ctx: StateContext<AuthStateModel>, { oauthResult, userInfo }: YandexOAuthSuccess) {
    ctx.patchState({
      isLoading: false,
      isAuthorized: true,
      status: 'success',
      token: oauthResult.accessToken,
      yandexUser: userInfo,
      authProvider: 'yandex',
    });
  }

  @Action(YandexOAuthError)
  yandexOAuthError(ctx: StateContext<AuthStateModel>, { error }: YandexOAuthError) {
    console.error('Yandex OAuth Error:', error);
    ctx.patchState({
      isLoading: false,
      status: 'error',
      isAuthorized: false,
      token: '',
      yandexUser: null,
    });
  }

  @Action(LogOut)
  logout(ctx: StateContext<AuthStateModel>) {

    sessionStorage.removeItem('isAuthorized');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('shop');
    sessionStorage.removeItem('shopList');

    ctx.patchState({ 
      isAuthorized: false, 
      token: '',
      yandexUser: null,
      authProvider: null,
    });

  }

}