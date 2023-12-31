import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { name, email, mob, pass } from 'src/shared/constants/regex-rule';
import { SharedService } from 'src/shared/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm!: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    return this.signUpForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(name)]],
      last_name: ['', [Validators.required, Validators.pattern(name)]],
      email: ['', [Validators.required, Validators.pattern(email)]],
      phone: ['', [Validators.required, Validators.pattern(mob)]],
      role: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(pass)]],
    },
      { validator: this.passwordMatchValidator }
    )
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      form.get('confirm_password')?.setErrors({ 'passwordMismatch': true });
    } else {
      form.get('confirm_password')?.setErrors(null);
    }
    return null;
  }

  signup() {
    if (this.signUpForm.valid) {
      const formData = { ...this.signUpForm.value };
      delete formData.confirm_password;
      formData.cart = [];
      formData.orders = [];
      formData.phone = parseInt(formData.phone, 10);

      this.authService.registerUser(formData).subscribe((res) => {
        if (res) {
          this.sharedService.showAlert("Congratulations! You Are Registered!", "success");
          this.router.navigate(['/login'])
        } else {
          this.sharedService.showAlert("Oops! Something Went Wrong!", "error");
        }
      });
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", "error");
    }
  }
}
