import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem("token");
  const isUserLoggedIn = localStorage.getItem('loggedUserId');

  if (isUserLoggedIn) {
    if (token == "admin") {
      return true;
    } else {
      router.navigate(['/home'])
      return false;
    }
  } else {
    // router.navigate(['/login'])
    return false;
  }
};
