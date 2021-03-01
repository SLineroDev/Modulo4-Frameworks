import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_KEY: string = 'User';

  logged: boolean = false;
  loggedState: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    this.logged = this.isLogged();
  }

  login(username: string, password: string): boolean {
    let res = false;

    if (username == 'master' && password == '12') {
      localStorage.setItem(this.USER_KEY, username);
      this.logged = true;
      this.loggedState.next(this.logged);
      res = true;
    }
    return res;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.logged = false;
    this.loggedState.next(this.logged);
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    let res = localStorage.getItem(this.USER_KEY) != null ? true : false;
    this.loggedState.next(res);
    return res;
  }

  getUsername(): string {
    return localStorage.getItem(this.USER_KEY) || '';
  }
}
