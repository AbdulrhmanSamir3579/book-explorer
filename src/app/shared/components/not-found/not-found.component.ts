import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="error-icon">
          <mat-icon class="large-icon">error_outline</mat-icon>
        </div>

        <h1 class="error-code">404</h1>

        <h2 class="error-title">{{ 'Page Not Found' | translate }}</h2>

        <p class="error-message">
          {{ 'Sorry, the page you are looking for doesn\\'t exist or has been moved.' | translate }}
        </p>

        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="goHome()">
            <mat-icon>home</mat-icon>
            {{ 'Go Home' | translate }}
          </button>

          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            {{ 'Go Back' | translate }}
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    TranslatePipe
  ],
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 64px);
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .not-found-content {
      text-align: center;
      max-width: 500px;
      padding: 40px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .error-icon {
      margin-bottom: 20px;
    }

    .large-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ff6b6b;
    }

    .error-code {
      font-size: 6rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .error-title {
      font-size: 2rem;
      font-weight: 600;
      margin: 20px 0 10px 0;
      color: #333;
    }

    .error-message {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .action-buttons button {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 120px;
    }

    @media (max-width: 600px) {
      .not-found-container {
        min-height: calc(100vh - 56px);
        padding: 10px;
      }

      .not-found-content {
        padding: 30px 20px;
      }

      .error-code {
        font-size: 4rem;
      }

      .error-title {
        font-size: 1.5rem;
      }

      .error-message {
        font-size: 1rem;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }

      .action-buttons button {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    window.history.back();
  }
}
