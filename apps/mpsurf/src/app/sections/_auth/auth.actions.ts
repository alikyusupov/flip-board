import { IApiConfigDto } from "@models";

import { IYandexOAuthResult, IYandexUserInfo } from "./models";


export class LogIn {
  constructor(public dto: IApiConfigDto) {}
  static readonly type = '[AuthState] login';
}

export class LogOut {
  static readonly type = '[AuthState] logout';
}

export class YandexOAuthLogin {
  static readonly type = '[AuthState] yandex oauth login';
}

export class YandexOAuthSuccess {
  constructor(
    public oauthResult: IYandexOAuthResult,
    public userInfo: IYandexUserInfo
  ) {}
  static readonly type = '[AuthState] yandex oauth success';
}

export class YandexOAuthError {
  constructor(public error: string) {}
  static readonly type = '[AuthState] yandex oauth error';
}

export class Register {
  static readonly type = '[AuthState] register';
  constructor(public dto:  IApiConfigDto){}
}