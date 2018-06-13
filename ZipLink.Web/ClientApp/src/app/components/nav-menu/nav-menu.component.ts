import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/userInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isExpanded = false;
  isLoggedIn = false;
  userName = '';
  logInSubscription: any;
  logOutSubscription: any;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let userServiceEmitters = this.userService.getEventEmitters();
    let onLoggedInEmitter = userServiceEmitters[0];
    let onLoggedOutEmitter = userServiceEmitters[1];

    this.isLoggedIn = this.userService.isLoggedIn();

    this.logInSubscription = onLoggedInEmitter.subscribe(() => {
      this.isLoggedIn = true;
      this.router.navigate(['links']);
      this.getUserName();
    });

    this.logOutSubscription = onLoggedOutEmitter.subscribe(() => {
      this.isLoggedIn = false;
      this.userName = '';
      this.router.navigate(['']);
    });

    if (this.isLoggedIn) {
      this.getUserName();
    }
  }

  private getUserName(): void {
    this.userService
      .getUserInfo()
      .subscribe(
        resp => this.userName = (<UserInfo>resp.json()).userName,
        err => this.userService.logout());
  }

  ngOnDestroy(): void {
    this.logInSubscription.unsubscribe();
    this.logOutSubscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
