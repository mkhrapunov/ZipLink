import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';
import { Time } from '@angular/common';
import { UserLink } from '../../models/userLink';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  public userLinks: UserLink[];
  public errors: string;

  constructor(private http: Http, private userService: UserService, @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit() {
    let headers = this.userService.authHeaders();

    return this.http.get(this.baseUrl + "api/linkmanage/all", { headers })
      .map(response => this.userLinks = response.json())
      .catch(err => this.errors = err)
      .subscribe();
  }

}

