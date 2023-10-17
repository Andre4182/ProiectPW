import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const auth=inject(AuthService);
  const toast=inject(NgToastService)
  if(auth.isLoggedIn()){
    return true;
  }else{
    toast.error({detail:"Error", summary:"You need to be logged in!", duration: 5000})
    router.navigate(['login']);
    return false;
  }
};
