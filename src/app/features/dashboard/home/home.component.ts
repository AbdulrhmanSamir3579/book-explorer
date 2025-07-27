import { Component } from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    TranslatePipe,
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    MatCardImage,
    MatCardTitle,
    MatCardSubtitle
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  runTests(): void {
    this.router.navigate(['/dashboard/books-list']);
    console.log('Tests would run here in a real implementation');
  }
}
