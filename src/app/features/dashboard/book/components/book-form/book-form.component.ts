import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

interface BookFormDialogData {
  mode: 'add' | 'edit';
  bookData?: Book;
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    TranslatePipe,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    MatHint
  ],
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  bookForm!: FormGroup;
  loading = false;
  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Biography', 'History'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookFormDialogData
  ) {
    this.initializeForm();
    if (this.data.mode === 'edit' && this.data.bookData) {
      this.bookForm.patchValue(this.data.bookData);
    }
  }

  private initializeForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.loading = true;
      this.dialogRef.close(this.bookForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get isEditMode(): boolean {
    return this.data.mode === 'edit';
  }
}
