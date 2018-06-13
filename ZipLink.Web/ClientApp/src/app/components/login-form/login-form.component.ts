import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  errors: string;
  userName = '';
  isNew = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let routeQueryParams = this.route.snapshot.queryParamMap;
    if (routeQueryParams.has('new')) {
      this.isNew = routeQueryParams.get('new') === 'true';
    }
    if (routeQueryParams.has('userName')) {
      this.userName = routeQueryParams.get('userName');
    }
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.errors = '';
    if (valid) {
      this.userService.login(value.userName, value.password)
        //.finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['links']);
            }
          },
          error => this.errors = error);
    }
  }

}

