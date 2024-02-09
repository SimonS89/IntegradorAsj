import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.obtenerToken();
    let authReq = req.clone();
    if (authToken) {
      authReq = authReq.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
    if (!authReq.headers.has('Content-Type')) {
      authReq = authReq.clone({
        headers: authReq.headers.set('Content-Type', 'application/json'),
      });
    }
    return next.handle(authReq);
  }
}
