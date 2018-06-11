import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
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
        //.finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              alert("Register successfull");
              //this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          },
          errors => this.errors = errors);
    }
  } 

}

interface UserRegistration {
  userName: string,
  password: string
}
