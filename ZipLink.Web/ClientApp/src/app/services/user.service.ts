import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  loggedIn = false;

  constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string)
  {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = error.json();

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }

  register(userName: string, password: string): Observable<boolean> {
    let body = JSON.stringify({ userName, password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "api/accounts", body, options)
      .map(res => true)
      .catch(this.handleError);
  }

  login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.baseUrl + 'api/auth/login',
        JSON.stringify({ userName, password }), { headers }
      )
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        console.log(`logged in with token ${res.auth_token}`);
        this.loggedIn = true;
        //this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    console.log('logged out!');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
