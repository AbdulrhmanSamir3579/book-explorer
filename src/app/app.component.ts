import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LanguageService} from './core/services/language.service';
import {NavbarComponent} from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'book-explorer';

  constructor(private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setAppDefaultLang();
  }

  private setAppDefaultLang() {
    this.languageService.setInitialAppLanguage()
  }
}
