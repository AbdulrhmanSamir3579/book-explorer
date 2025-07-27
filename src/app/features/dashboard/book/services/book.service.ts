import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import {HttpService} from '../../../../core/services/http.service';
import {Book} from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpService);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`/books`);
  }

  getBook(id: string | number): Observable<Book> {
    return this.http.get<Book>(`/books/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`/books`, book);
  }

  updateBook(id: string | number, book: Book): Observable<Book> {
    return this.http.put<Book>(`/books/${id}`, book);
  }

  deleteBook(id: string | number): Observable<void> {
    return this.http.delete<void>(`/books/${id}`);
  }

  searchBooks(query: string | number): Observable<Book[]> {
    return this.http.get<Book[]>(`/books?query=${query}`);
  }
}
