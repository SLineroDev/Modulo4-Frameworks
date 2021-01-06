import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  logged: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.loggedState.subscribe((value) => {
      this.logged = value;
    });
    this.logged = this.auth.isLogged();
  }

  ngOnInit(): void {}
}
