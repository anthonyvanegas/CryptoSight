import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy{
  users: User[] = [];
  private usersSub: Subscription = new Subscription;
  private userState: boolean = false;

  constructor(public userService: UserService, 
              public http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener().subscribe((users: User[]) => {
        this.users = users;
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  get isExistingUser(): boolean {
    return this.userState;
  }

  set isExistingUser(userExist: boolean) {
    this.userState = userExist;
  }

  signup(form: NgForm): void {
    this.isExistingUser = this.users.some(existingUser => existingUser.email === form.value.email);
    if ((form.value.confirmPassword == form.value.password) && form.valid && this.isExistingUser !== true) {
      const user: User = {
        id: "",
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        email: form.value.email,
        password: form.value.password
      };
    this.userService.addUser(user);
    form.resetForm();
    this.router.navigateByUrl('/dashboard');
    }
  }
}
