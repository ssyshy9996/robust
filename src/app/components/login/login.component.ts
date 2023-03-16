import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(public auth: AuthService, private router: Router, public tutorial: TutorialService, public toast: ToastrService) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.tutorial.login({
      email: this.email,
      password: this.password,
    }).subscribe((data: { email: string, password: string }) => {
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);

      this.toast.success('Successfully Logged In', 'Log In');
      this.router.navigate(['/dashboard']);
    }, (error) => {
      this.toast.error('Email or Password is incorrect', 'Login Error!');
    })
  }

}
