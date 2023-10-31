import { Component, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  userCreated = new EventEmitter<User>();

  constructor(public usersService: UserService) {}

  signup(form: NgForm): void {
    if ((form.value.confirmPassword !== form.value.password) && form.valid) {
      const user: User = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password
      };
      this.usersService.addUser(user);
    }
  }
}
