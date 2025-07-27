import {Component, inject, OnInit} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {AuthService} from "../../../features/auth/auth.service";
import {LanguageService} from "../../../core/services/language.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatMenuTrigger,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatDivider,
        RouterLink,
        MatButton,
        MatToolbar,
        RouterLinkActive
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    language!: string;
    languageService = inject(LanguageService);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.language = this.languageService.getLanguage()
    }

    toggleLanguage(lang: string) {
        this.languageService.changeLanguage(lang);
        this.language = lang;
    }

    logout() {
        this.authService.logout();
    }
}
