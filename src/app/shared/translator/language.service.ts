import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLanguage = 'en';
  private availablelangs = [
    {
      code: 'es',
      text: 'Español',
      icon: 'flag-icon-co',
      title: 'ES',
    },
    {
      code: 'en',
      text: 'English',
      icon: 'flag-icon-us',
      title: 'US',
    },
  ];

  constructor(public translateService: TranslateService) {
    this.useLanguage();
  }

  useLanguage(lang: any = null) {
    this.translateService.use(lang || this.defaultLanguage);
  }

  getAvailableLanguages() {
    return this.availablelangs;
  }

  private translate(key: string): Observable<any> {
    return this.translateService.get(key);
  }

  public instant(key: string): Observable<any> {
    return this.translate(key);
  }
}
