import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): string {
    return localStorage.getItem(key)!;
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
