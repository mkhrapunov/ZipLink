import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { LinkForReduction } from '../models/linkForReduction';

@Injectable()
export class LinkService {

  onLinkAdded: EventEmitter<void> = new EventEmitter();

  constructor(private http: Http, private userService: UserService, @Inject('BASE_URL') private baseUrl: string) {}

  add(link: LinkForReduction): Observable<Response> {
    let headers = this.userService.authHeaders();
    return this.http
      .post(this.baseUrl + "api/linkmanage/add", link, { headers })
      .finally(() => {
        if (this.onLinkAdded.observers.length > 0) {
          console.log(this.onLinkAdded.observers.length);
          this.onLinkAdded.emit();
        }
      });
  }

  getLinks(): Observable<Response> {
    let headers = this.userService.authHeaders();

    return this.http.get(this.baseUrl + "api/linkmanage/all", { headers });
  }

}
