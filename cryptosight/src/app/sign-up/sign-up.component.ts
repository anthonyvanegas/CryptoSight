import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupUser } from './signup-user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  user: SignupUser = new SignupUser();

  get isPasswordMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  signup(form: NgForm): void {
    if (this.isPasswordMatch && form.valid) {
        
    }
  }
}
