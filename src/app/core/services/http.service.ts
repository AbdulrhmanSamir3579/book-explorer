import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private authApiBase = 'https://reqres.in/api';
  private dataApiBase = 'https://crudcrud.com/api/06b500e15d7a433e83d418fe94960471';

  constructor(private httpClient: HttpClient) {}

  private getFullUrl(endpoint: string, isAuthEndpoint: boolean = false): string {
    const baseUrl = isAuthEndpoint ? this.authApiBase : this.dataApiBase;
    return `${baseUrl}/${endpoint.replace(/^\//, '')}`;
  }

  get<T>(endpoint: string, params?: any, isAuthEndpoint: boolean = false): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.httpClient.get<T>(this.getFullUrl(endpoint, isAuthEndpoint), { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any, isAuthEndpoint: boolean = false): Observable<T> {
    return this.httpClient.post<T>(this.getFullUrl(endpoint, isAuthEndpoint), body)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any, isAuthEndpoint: boolean = false): Observable<T> {
    return this.httpClient.put<T>(this.getFullUrl(endpoint, isAuthEndpoint), body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, isAuthEndpoint: boolean = false): Observable<T> {
    return this.httpClient.delete<T>(this.getFullUrl(endpoint, isAuthEndpoint))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || error.message;
    }
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
