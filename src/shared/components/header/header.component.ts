import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  logOut() {
    this.authService.removeLoggedUser();
    console.log('Successfully Logged out')
    this.router.navigate(['/login']);
  }
}
