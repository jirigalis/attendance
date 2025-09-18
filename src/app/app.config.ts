import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./modules/app-routing.module";
import { jwtInterceptor } from "./modules/core/interceptors/jwt.interceptor";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideNativeDateAdapter(),
        provideAnimationsAsync(),
    ],
}