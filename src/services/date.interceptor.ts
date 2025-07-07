import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class DateInterceptor implements HttpInterceptor {

  private isIsoDateString(value: string): boolean {
    // ISO 8601 date string: e.g., 2025-07-08T09:00:00 or with milliseconds/Z
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(Z)?$/.test(value);
  }

  private convertDates(body: any): any {
    if (!body || typeof body !== 'object') return body;

    for (const key of Object.keys(body)) {
      const value = body[key];

      if (typeof value === 'string' && this.isIsoDateString(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        body[key] = this.convertDates(value); // recurse
      }
    }

    return body;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.body) {
          const converted = this.convertDates(event.body);
          return event.clone({ body: converted });
        }
        return event;
      })
    );
  }
}
