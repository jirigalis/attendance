import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

if (environment.production) {
  enableProdMode();
}

/*platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));*/
bootstrapApplication(AppComponent, appConfig).catch(error => {
    console.error(error);
})
