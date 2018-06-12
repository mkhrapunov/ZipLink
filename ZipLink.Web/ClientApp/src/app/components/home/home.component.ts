import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Http, Response } from '@angular/http';
import { UserInfo } from '../../userInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  linksCount = 0;
  userName = '';

  constructor(private userService: UserService, private router: Router, private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    this.http
        .get(this.baseUrl + "l/info/count")
      .subscribe(resp => this.linksCount = (<LinksInfo>resp.json()).linksCount);

    if (this.userService.isLoggedIn()) {
      this.userService
        .getUserInfo()
        .subscribe(
          resp => this.userName = (<UserInfo>resp.json()).userName,
          err => this.userService.logout());
    }
  }
}

interface LinksInfo {
  linksCount: number;
}
