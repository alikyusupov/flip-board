/* eslint-disable @typescript-eslint/no-this-alias */
import { inject, Injectable } from "@angular/core";
import { API_PROD_OLD, API_TEST_OLD } from "@consts";
import { ApiRequestStateType } from "@models";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { environment } from "environments/environment";
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PROFILE_SERVICE_TOKEN } from "../../tokens";
import { FetchShopTaxList, LoadShops, SaveShopTaxList, UpdateConnectionName, UpdateCurrency } from "./shops.actions";
import { IShopWB, ITaxItem } from "./shops.model";

export interface ProfileShopsStateModel {
  isShoplistLoading: boolean,
  status: ApiRequestStateType,
  shops: IShopWB[],

  isTaxListLoading: boolean,
  taxListstatus: ApiRequestStateType,
  taxList: ITaxItem[]
}

@State<ProfileShopsStateModel>({
  name: 'ProfileShopsStateModel',
  defaults: {
    isShoplistLoading: false,
    status: 'success',
    shops: [],

    isTaxListLoading: false,
    taxListstatus: 'success',
    taxList: [],
  }
})
@Injectable()
export class ProfileShopsState {

  private readonly HOST = environment.api === 'test' ? API_TEST_OLD : API_PROD_OLD;

  private readonly profileService = inject(PROFILE_SERVICE_TOKEN);
  private readonly notification = inject(NzNotificationService)

  @Selector()
  static shops(state: ProfileShopsStateModel): IShopWB[] {
    return state.shops
  }

  @Selector()
  static isShoplistLoading(state: ProfileShopsStateModel): boolean {
    return state.isShoplistLoading;
  }

  @Selector()
  static status(state: ProfileShopsStateModel): ApiRequestStateType {
    return state.status
  }

  @Selector()
  static taxList(state: ProfileShopsStateModel): ITaxItem[] {
    return state.taxList
  }

  @Selector()
  static isTaxListLoading(state: ProfileShopsStateModel): boolean {
    return state.isTaxListLoading;
  }

  @Selector()
  static taxListstatus(state: ProfileShopsStateModel): ApiRequestStateType {
    return state.taxListstatus
  }


  @Action(LoadShops)
  loadShops(ctx: StateContext<ProfileShopsStateModel>, {dto}: LoadShops) {

    ctx.patchState({ shops: [], isShoplistLoading: true });

    this.profileService.getShops(dto)
      .subscribe({
        next(shops) {
          ctx.patchState({ shops: shops, isShoplistLoading: false });
        },
        error() {
          ctx.patchState({ isShoplistLoading: false });
        },
      })
  }

  @Action(UpdateConnectionName)
  updateConnectionName(ctx: StateContext<ProfileShopsStateModel>, { dto }: UpdateConnectionName) {

    const self = this;

    this.profileService.updateConnectionName(dto)
      .subscribe({
        next(res) {
          if(res.data.is_error){
            self.notification.create('error', 'Статус:', res.data.msg)
          } else {
            self.notification.create('success', 'Статус:', res.data.msg);
            
            ctx.dispatch(new LoadShops({
              method: 'POST',
              endpoint: 'data',
              action: 'getDataShopWBList',
              host: self.HOST
            }));
          } 
        },
        error(error) {
          console.log(error)
          self.notification.create('error', 'Статус:', error?.error?.message || 'Ошибка внесения изменений')
        },
      })
  }

  @Action(FetchShopTaxList)
  fetchShopTaxList(ctx: StateContext<ProfileShopsStateModel>, { dto }: FetchShopTaxList) {

    ctx.patchState({ taxList: [], isTaxListLoading: true, taxListstatus: 'success' });

    this.profileService.fetchTaxList(dto)
      .subscribe({
        next(res) {
         ctx.patchState({ taxList: res.data, isTaxListLoading: false });
        },
        error() {
          ctx.patchState({ isTaxListLoading: false, taxListstatus: 'error' });
        },
      })
  }

  @Action(SaveShopTaxList)
  saveShopTaxList(ctx: StateContext<ProfileShopsStateModel>, { dto }: SaveShopTaxList) {

    const self = this;

    this.profileService.saveTaxList(dto)
      .subscribe({
        next() {
          self.notification.create('success', 'Статус:', 'Сохранение успешно завершено');
          ctx.dispatch(new LoadShops({
            method: 'POST',
            endpoint: 'data',
            action: 'getDataShopWBList',
            host: self.HOST
          }));
        },
        error() {
          self.notification.create('success', '', 'Ошибка сохранения');
        },
      })
  }

  @Action(UpdateCurrency)
  updateCurrency(ctx: StateContext<ProfileShopsStateModel>, { dto }: UpdateCurrency) {

    const self = this;

    this.profileService.updateCurrency(dto)
      .subscribe({
        next(res) {
      
          self.notification.create('success', 'Статус:', res.msg);
          
          ctx.dispatch(new LoadShops({
            method: 'POST',
            endpoint: 'data',
            action: 'getDataShopWBList',
            host: self.HOST
          }));
          
        },
        error(error) {
          self.notification.create('error', 'Статус:', error?.error?.message || 'Ошибка внесения изменений')
        },
      })
  }

}