import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {

  constructor(private router: Router) { }

  back() {
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    this.router.navigateByUrl('');
  }

}
