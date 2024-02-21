import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.getToken();

    if (token) {
      const tokenCloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(tokenCloned);
    }

    return next.handle(request);


  }
}
