import { IApiConfigDto } from "@models";
import { Observable } from "rxjs";

export interface IAuthResponse {
  is_error: number,
  is_test: number
  msg: string
  token: string
}

export interface LoginDto {
  password: string,
  phoneNumber: string
} 

export interface IAuthService {
  login: (dto: IApiConfigDto) => Observable<IAuthResponse>;
  register: (dto: IApiConfigDto) => Observable<{ msg: string }>
}

// Yandex OAuth Types
export interface IYandexOAuthResult {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface IYandexUserInfo {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string;
  default_email: string;
  emails: string[];
  default_avatar_id: string;
  is_avatar_empty: boolean;
  default_phone: { id: number; number: string };
  psuid: string;
}