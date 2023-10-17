import { LocalizedString } from '@angular/compiler';
import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, mapToCanActivate } from '@angular/router';
import {LoginComponent} from './componentss/login/login.component';
import {SignupComponent} from './componentss/signup/signup.component';
import { NgToastComponent } from 'ng-angular-popup';
import { AuthService } from './services/auth.service';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'cars',
    canActivate:[authGuard],
    loadChildren:() => import('./cars/cars.module').then(m => m.CarsModule)
  },
  {
    path: 'components',
    canActivate:[authGuard],
    loadChildren:() => import('./components/components.module').then(c => c.ComponentsModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup', 
    component:SignupComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
