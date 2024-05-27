import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  otpVerificationForm!: FormGroup;
  userEmail: string | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.userEmail = user.email;

    this.otpVerificationForm = this.fb.group({
      email: [this.userEmail, Validators.required], // Set email field with user's email
      EnteredOTP: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.otpVerificationForm.valid) {
      const otpVerificationDto = {
        email: this.userEmail, // Use userEmail instead of trying to access from form value
        EnteredOTP: this.otpVerificationForm.value.otp,
      };

      this.auth.otpVerification(otpVerificationDto).subscribe({
        next: (res) => {
          this.otpVerificationForm.reset();

          this.snackBar.open(res.message, 'Okay', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['reset-password']);
        },
        error: (err) => {
          this.snackBar.open(err, 'Try again', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      ValidateForm.validdateAllFromFileds(this.otpVerificationForm);
      this.snackBar.open('Your form is invalid', 'Try again', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
