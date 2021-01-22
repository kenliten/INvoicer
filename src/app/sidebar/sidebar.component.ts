import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  isLoggedIn() {
    this.authService.isLoggedIn()
      .subscribe(r => this.loggedIn = r);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

}
