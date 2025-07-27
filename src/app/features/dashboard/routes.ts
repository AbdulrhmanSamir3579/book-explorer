import {Routes} from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'books-list',
    loadComponent: () => import('./book/pages/book-list/book-list.component').then(m => m.BooksListComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./book/pages/book-details/book-details.component').then(m => m.BookDetailsComponent)
  },
  {path: '', redirectTo: 'books-list', pathMatch: 'full'}
];
