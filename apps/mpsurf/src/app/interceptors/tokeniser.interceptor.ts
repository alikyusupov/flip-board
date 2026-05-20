import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function TokeniserInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const authTokenStorage = sessionStorage.getItem('token');
  const shopStorage = sessionStorage.getItem('shop');

  const authToken = authTokenStorage ? authTokenStorage : '';
  const shopId = shopStorage ? JSON.parse(shopStorage).id : 0;

  let newReq!: HttpRequest<unknown>;

  if (req.body && (req.body as Record<string, string>)['action'] === 'login') {
    const payload = { ...req.body as object, token: null, project: 1 };

    newReq = req.clone({
      body: payload
    });

    return next(newReq);
  }


  if (req.method === 'GET' || req.method === 'DELETE') {

    const params = req.params
    .append('token', authToken)
    .append('project', 1)
    
    newReq = req.clone({
      params
    });
  }
  else {

    const payload: { token: string, shop_id?: number, project: number } = { ...req.body as object, token: authToken, project: 1 };

    if(shopId) {
      payload['shop_id'] = shopId;
    }

    newReq = req.clone({
      body: payload
    });

  }

  return next(newReq);

}