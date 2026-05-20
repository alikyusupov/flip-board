import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDateRangeService {

  constructor(){
    console.log('GLOBAL TIME SERVICE')
  }

  dateRange$ = new BehaviorSubject<Date[]>([])

}
