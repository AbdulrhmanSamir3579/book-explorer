import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  translateService = inject(TranslateService)

  setDefaultLang(lang: string) {
    this.translateService.setDefaultLang(lang);
  }

  use(lang: string): Observable<any>{
    return this.translateService.use(lang);
  }
}
