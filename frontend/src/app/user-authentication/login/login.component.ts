import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription = new Subscription;
  private userState: boolean = true;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener().subscribe((users: User[]) => {
        this.users = users;
    });
  }

  get isExistingUser(): boolean {
    return this.userState;
  }

  set isExistingUser(userExist: boolean) {
    this.userState = userExist;
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  login(form: NgForm) {
    this.isExistingUser = this.users.some(existingUser => (existingUser.email === form.value.email) && (existingUser.password === form.value.password));
    if (form.valid && this.isExistingUser == true) {
      form.resetForm();
      this.router.navigateByUrl('/dashboard');
    }
  }
}
