import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { USERS } from './users-mock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean;
  users: User[] = USERS;

  activeUser = this.users[0];
  
  constructor() {
    this.loggedIn = false;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.loggedIn);
  }

  login(user: string, password: string): Observable<User> {
    console.log("Data provided: username: %s, password: %s", user, password);
    this.loggedIn = true;
    return of(this.users[0]);
  }
}
