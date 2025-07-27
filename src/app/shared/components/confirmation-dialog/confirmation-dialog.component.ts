import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface ConfirmationDialogConfig {
  title?: string;
  message: string;
  icon?: string;
  confirmButtonText?: string;
  confirmButtonColor?: 'primary' | 'accent' | 'warn';
  cancelButtonText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  template: `
    <div class="confirmation-dialog">
      <div class="header">
        <mat-icon *ngIf="data.icon">{{ data.icon }}</mat-icon>
        <h2>{{ data.title || 'Confirm Action' | translate }}</h2>
      </div>
      <div class="content">
        <p>{{ data.message | translate }}</p>
      </div>
      <div class="actions">
        <button mat-button (click)="onCancel()">
          {{ data.cancelButtonText || 'Cancel' | translate }}
        </button>
        <button
          mat-flat-button
          [color]="data.confirmButtonColor || 'primary'"
          (click)="onConfirm()">
          {{ data.confirmButtonText || 'Confirm' | translate }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirmation-dialog {
      padding: 24px;
      max-width: 400px;
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }
      }
      .content {
        margin-bottom: 24px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogConfig
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
