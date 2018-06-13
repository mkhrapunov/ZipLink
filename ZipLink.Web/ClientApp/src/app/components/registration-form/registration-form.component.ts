import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserRegistration } from '../../models/userRegistration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent implements OnInit {

  errors: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.errors = '';
    if (valid) {
      this.userService.register(value.userName, value.password)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['login'], { queryParams: { 'new': true, 'userName': value.userName } });
            }
          },
          errors => this.errors = errors);
    }
  } 

}

