import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppTranslateModule} from '../../../../../shared/modules/app-translate.module';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookFormComponent,
        HttpClientModule,
        AppTranslateModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { mode: 'add' }
        },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when required fields are empty', () => {
    component.bookForm.setValue({
      title: '',
      author: '',
      category: '',
      price: null,
      description: ''
    });
    expect(component.bookForm.invalid).toBeTrue();
  });

  it('should have a valid form when all fields are filled', () => {
    component.bookForm.setValue({
      title: 'Book',
      author: 'Author',
      category: 'Fiction',
      price: 10,
      description: 'A description'
    });
    expect(component.bookForm.valid).toBeTrue();
  });

  it('should close the dialog with form data on submit', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    component.bookForm.setValue({
      title: 'Book',
      author: 'Author',
      category: 'Fiction',
      price: 10,
      description: 'A description'
    });
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith(component.bookForm.value);
  });

  it('should not close the dialog if form is invalid', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    component.bookForm.patchValue({ title: '' });
    component.onSubmit();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});

