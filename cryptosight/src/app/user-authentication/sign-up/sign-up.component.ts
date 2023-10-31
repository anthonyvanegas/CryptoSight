import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy{
  users: User[] = [];
  private usersSub: Subscription = new Subscription;
  private newUser: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener().subscribe((users: User[]) => {
        this.users = users;
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  get isNewUser(): boolean {
    return this.newUser;
  }

  signup(form: NgForm): void {
    if ((form.value.confirmPassword == form.value.password) && form.valid) {
      const user: User = {
        id: "",
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password
      };
      form.resetForm();
    }
  }
}
