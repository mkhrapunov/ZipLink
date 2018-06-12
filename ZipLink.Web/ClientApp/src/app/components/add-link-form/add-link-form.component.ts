import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-link-form',
  templateUrl: './add-link-form.component.html',
  styleUrls: ['./add-link-form.component.css']
})
export class AddLinkFormComponent implements OnInit {

  errors: string;

  constructor(private http: Http, private userService: UserService, private router: Router, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  add({ form, valid }: { form: NgForm, valid: boolean })
  {
    this.errors = '';

    if (valid) {
      let headers = this.userService.authHeaders();
      let linkForReduction = <LinkForReduction>form.value;

      return this.http.post(this.baseUrl + "api/linkmanage/add", linkForReduction, { headers })
        .map(response => {
          form.reset();
          this.router.navigate(['links']);
        })
        .catch(err => this.errors = err)
        .subscribe();
    }
  }
}

interface LinkForReduction {
  url: string;
}
