import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const isLoggedIn = auth.isLoggedIn();
  const userRole = auth.getRole();

  if (!isLoggedIn || userRole !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
  

}
