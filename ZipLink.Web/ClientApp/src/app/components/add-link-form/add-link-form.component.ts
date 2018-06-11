import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-link-form',
  templateUrl: './add-link-form.component.html',
  styleUrls: ['./add-link-form.component.css']
})
export class AddLinkFormComponent implements OnInit {

  errors: string;

  constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  add({ form, valid }: { form: NgForm, valid: boolean })
  {
    this.errors = '';

    if (valid) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
      let linkForReduction = <LinkForReduction>form.value;

      return this.http.post(this.baseUrl + "api/linkmanage/add", linkForReduction, { headers })
        .map(response => {
          form.reset();
        })
        .catch(err => this.errors = err)
        .subscribe();
    }
  }
}

interface LinkForReduction {
  url: string;
}
