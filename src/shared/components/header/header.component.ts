import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUserId !: number;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUserId$.subscribe((res) => {
      this.currentUserId = res;
      this.authService.getUserDataById(res).subscribe((result) => {
        this.currentUser = result
      })
    });

  }
  logOut() {
    this.authService.removeLoggedUser();
    console.log('Successfully Logged out')
    this.router.navigate(['/login']);
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }


}
