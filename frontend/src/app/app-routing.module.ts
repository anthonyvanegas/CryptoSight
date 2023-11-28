import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-authentication/login/login.component';
import { SignUpComponent } from './user-authentication/sign-up/sign-up.component';
import { MainscreenComponent } from './dashboard/main-screen/main-screen.component';
import { AssetViewComponent } from './dashboard/asset-view/asset-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: MainscreenComponent },
  { path: 'asset-view', component: AssetViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
