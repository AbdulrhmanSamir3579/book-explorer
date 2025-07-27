import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslateModule} from '@ngx-translate/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {BookFormComponent} from '../../components/book-form/book-form.component';
import {
  ConfirmationDialogComponent
} from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {FormsModule} from '@angular/forms';
import {TruncatePipe} from '../../../../../core/pipes/truncate.pipe';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {MatTooltip} from '@angular/material/tooltip';

export interface BookFormConfig {
  mode: 'add' | 'edit';
  _id?: string | number;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TranslateModule,
    FormsModule,
    TruncatePipe,
    MatTooltip
  ],
  templateUrl: 'book-list.component.html',
  styleUrls: ['book-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  loading = false;
  isSearching = false;
  searchQuery = '';
  sortField: 'title' | 'author' | 'price' = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }



  ngOnInit(): void {
    this.loadBooks();
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.applySearchAndSort();
      this.isSearching = false;
    });
  }

  onSearchChange(): void {
    this.isSearching = true;
    this.searchSubject.next(this.searchQuery.trim());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = [...books];
        this.applySearchAndSort();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load books', 'Close', {duration: 3000});
      }
    });
  }


  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '800px',
      data: {mode: 'add'}
    });

    dialogRef.afterClosed().subscribe((result?: Book) => {
      if (result) {
        this.handleBookSubmit(result, {mode: 'add'});
      }
    });
  }

  openEditDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '800px',
      data: {
        mode: 'edit',
        bookData: book
      }
    });

    dialogRef.afterClosed().subscribe((result?: Book) => {
      if (result) {
        this.handleBookSubmit(result, {mode: 'edit', _id: book._id});
      }
    });
  }

  deleteBook(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Book',
        message: 'Are you sure you want to delete this book?',
        icon: 'delete',
        confirmButtonColor: 'warn',
        confirmButtonText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.snackBar.open('Book deleted successfully', 'Close', {duration: 3000});
            this.loadBooks();
          },
          error: () => {
            this.snackBar.open('Failed to delete book', 'Close', {duration: 3000});
          }
        });
      }
    });
  }

  handleBookSubmit(book: Book, config: BookFormConfig): void {
    this.loading = true;

    const operation = config.mode === 'edit' && config._id
      ? this.bookService.updateBook(config._id, book)
      : this.bookService.createBook(book);

    operation.subscribe({
      next: () => {
        this.snackBar.open(`Book ${config.mode === 'edit' ? 'updated' : 'added'} successfully`, 'Close', {duration: 3000});
        this.loadBooks();
      },
      error: () => {
        this.loading = false;
        this.snackBar.open(`Failed to ${config.mode === 'edit' ? 'update' : 'add'} book`, 'Close', {duration: 3000});
      }
    });
  }

  applySearchAndSort(): void {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredBooks = query
      ? this.books.filter(book => {
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query)
        );
      })
      : [...this.books];

    this.sortBooks();
  }

  changeSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortBooks();
  }
  sortBooks(): void {
    this.filteredBooks.sort((a, b) => {
      let comparison = 0;

      if (this.sortField === 'price') {
        comparison = a.price - b.price;
      } else {
        comparison = a[this.sortField].localeCompare(b[this.sortField]);
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
}
