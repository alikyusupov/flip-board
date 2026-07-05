import { inject, Injectable } from '@angular/core';
import { IApiConfigDto } from '@models';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

import { IAuthResponse, IAuthService } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private readonly _API = inject(ApiService)

  login(dto: IApiConfigDto): Observable<IAuthResponse> {
    return this._API.makePostRequest(dto)
  };

  register(dto: IApiConfigDto): Observable<{msg: string}> {
    return this._API.makePostRequest(dto)
  };

}
