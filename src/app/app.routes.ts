import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canMatch: [authGuard],
    loadChildren: () => import('./features/dashboard/routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes').then(m => m.AUTH_ROUTES)
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', loadComponent: ()=> import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)},
];
