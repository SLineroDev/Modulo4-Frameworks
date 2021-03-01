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
  }

  ngOnInit(): void {
    this.user = this.auth.getUsername();
  }

  logout(): void {
    this.auth.logout();
  }
}
