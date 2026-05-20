import { IApiConfigDto } from "@models";
import { Observable } from "rxjs";

import { IClustersGrid } from "../pages/clusters/clusters.model";
import { ICostPriceResponse } from "../pages/costprice/costprice.model";
import { IRemainsTableResponse } from "../pages/remains/remains.models";


export interface IPlanningService {

  //REMAINS
  loadWarehouses: (dto: IApiConfigDto) => Observable<string[]>;
  loadTable: (dto: IApiConfigDto) => Observable<IRemainsTableResponse>;

  //CLUSTERS
  loadClustersGrid: (dto: IApiConfigDto) => Observable<IClustersGrid>;

  //COSTPRICE

  loadCostpriceGrid: (dto: IApiConfigDto) => Observable<ICostPriceResponse>;
}