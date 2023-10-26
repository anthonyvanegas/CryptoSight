import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

  user = {
    password: '',
    confirmPassword: ''
  };

  isPasswordMatch = this.user.password === this.user.confirmPassword;

  signup(form: NgForm): void {
    if (this.isPasswordMatch && form.valid) {
      
    }
  }
}
