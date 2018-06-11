import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  errors: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.errors = '';
    if (valid) {
      this.userService.login(value.userName, value.password)
        //.finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              //this.router.navigate(['/dashboard/home']);
            }
          },
          error => this.errors = error);
    }
  }

}

interface Credentials {
  userName: string;
  password: string;
}
