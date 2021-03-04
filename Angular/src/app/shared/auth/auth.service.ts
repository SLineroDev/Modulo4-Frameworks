import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  login(username: string, password: string): Observable<boolean> {
    let res: Observable<boolean>;
    if (username == 'master' && password == '12345678') {
      localStorage.setItem(this.USER_KEY, username);
      res = of(true).pipe(delay(2000));
    } else {
      res = of(false).pipe(delay(2000));
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
