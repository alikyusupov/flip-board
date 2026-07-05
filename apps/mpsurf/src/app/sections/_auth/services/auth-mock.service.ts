/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { IApiConfigDto } from '@models';
import { delay, Observable, of } from 'rxjs';

import { IAuthResponse, IAuthService } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {

  constructor() { 
    console.log("MOCK API")
  }

  login(dto: IApiConfigDto): Observable<IAuthResponse> {
    return of({
      is_error: 0,
      is_test: 0,
      msg: '',
      token: 'fdh56dfg546dfhdh'
    })
  };

  register(dto: IApiConfigDto): Observable<{msg: string}> {
    return of({msg: 'Письмо отправлено'}).pipe(delay(350))
  };

}

