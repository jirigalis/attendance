import { JwtInterceptor } from './jwt.interceptor';
/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
