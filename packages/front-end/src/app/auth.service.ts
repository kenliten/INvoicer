import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  getUserDetails() {
    return localStorage.getItem('userData') ? 
      JSON.parse(localStorage.getItem('userData')) : 
      null;
  }

  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }
}
