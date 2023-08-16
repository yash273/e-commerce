import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { email, pass } from 'src/shared/constants/regex-rule';
import { SharedService } from 'src/shared/services/shared.service';
import { User } from 'src/shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    return this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.getAllUsers().subscribe((res) => {
        if (res) {
          const user = res.find((a: User) => {
            return a.email === this.loginForm.value.email && this.loginForm.value.password;
          });
          if (user) {
            this.authService.saveUserToLocal(user);
            this.router.navigate(['/home']);
            this.sharedService.showAlert("login Successful", "success");
          } else {
            this.sharedService.showAlert("Please Check Credentials", "error");
          }
        } else {
          this.sharedService.showAlert("User not found", "error");
        }
      })
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", "error");
    }

  }
}
