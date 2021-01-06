import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  user: string = '';

  constructor(private auth: AuthService) {
    this.auth.loggedState.subscribe((value) => {
      this.logged = value;
    });
    this.logged = this.auth.isLogged();
    this.user = this.auth.getUsername();
  }

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
  }
}
