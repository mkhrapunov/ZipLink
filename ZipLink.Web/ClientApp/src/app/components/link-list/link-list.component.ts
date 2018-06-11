import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  public userLinks: UserLink[];
  public errors: string;

  constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + "api/linkmanage/all", { headers })
      .map(response => this.userLinks = response.json())
      .catch(err => this.errors = err)
      .subscribe();
  }

}

interface UserLink {
  reduction: string;
  fullUrl: string;
  transition: number;
}
