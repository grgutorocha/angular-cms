import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';
import { AuthGuardService } from './auth.guard.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authGuardService: AuthGuardService,
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const currentUser = JSON.parse(this.authGuardService.getCurrentUser());

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      });
    }

    return next.handle(request).pipe(finalize(() => this.loaderService.hide()));
  }
}
