
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    provideTranslateService({
      // fallbackLang reemplaza a defaultLanguage + useDefaultLang
      fallbackLang: 'en',
      // lang: 'es',

      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json'
      }),

      // Opcional: si quieres cargar inmediatamente un idioma al inicio
      // defaultLang: 'es'  ← ya no se usa, mejor usa fallbackLang + translate.use() en APP_INITIALIZER si necesitas
      }),

        provideRouter(routes),

        provideServiceWorker('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:30000'
        })
      ]
    };
