// jwt.interceptor.ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
    const auth = inject(AuthenticationService);
    const router = inject(Router); // pokud chceš po logoutu i redirect, máš ho po ruce

    const token = auth.currentUserValue?.token;
    const authReq: HttpRequest<unknown> = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((err: unknown) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                auth.logout();
            }
            return throwError(() => err);
        })
    );
};