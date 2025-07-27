import {Routes} from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'books-list',
    loadComponent: () => import('./book/pages/book-list/book-list.component').then(m => m.BooksListComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./book/pages/book-details/book-details.component').then(m => m.BookDetailsComponent)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
