import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only apply Basic Auth in production
    if (environment.production) {
      const { username, password } = environment.basicAuth;

      if (username && password) {
        const basicAuthHeader = 'Basic ' + btoa(`${username}:${password}`);

        const authReq = req.clone({
          setHeaders: {
            Authorization: basicAuthHeader
          }
        });

        return next.handle(authReq);
      }
    }

    // Otherwise just forward the original request
    return next.handle(req);
  }
}
