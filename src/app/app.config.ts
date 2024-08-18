import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient , HttpClient } from '@angular/common/http'; // Import provideHttpClient
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

 export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 }
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(), // Use provideAnimations instead of provideAnimationsAsync
    provideHttpClient()  ,  // Add this line to provide HttpClient
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ) 
  ]

};
