import {Inject, Injectable, signal} from '@angular/core';
import {TranslationService} from './translation.service';
import {LocalStorageService} from './local-storage.service';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private html: HTMLElement;
  private readonly langKey = 'lang'
  private readonly languageCode = 'en';
  private _currentLanguage = signal(this.languageCode);
  public currentLanguage = this._currentLanguage.asReadonly();
  constructor(
    private translationService: TranslationService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.html = this.document.getElementsByTagName('html')[0];
    this._currentLanguage.set(this.localStorageService.getItem(this.langKey) || this.languageCode);
  }

  setInitialAppLanguage() {
    this.translationService.setDefaultLang(this._currentLanguage());
    this.setLanguage(this._currentLanguage());
  }

  changeLanguage(lang: string): void {
    this.translationService.use(lang);
    this.setLanguage(lang);
  }

  private setLanguage(lang: string): void {
    this._currentLanguage.set(lang);
    this.localStorageService.setItem(this.langKey, lang);
    this.updateLayout();
  }

  private updateLayout(): void {
    this.html.lang = this._currentLanguage();
    this.document.dir = this.getDirection();
  }

  public getLanguage(): string {
    return this._currentLanguage();
  }

  public getDirection(): string {
    return this._currentLanguage() === this.languageCode ? 'ltr' : 'rtl';
  }
}
