import { Component, OnInit } from '@angular/core';
import { TutorialService } from "src/app/services/tutorial.service";
import { Router } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  tutorial = {
    fullname: '',
    email: '',
    password: '',
  };
  
  constructor(private tutorialservice: TutorialService, private router: Router, public auth:AuthService) { }

  ngOnInit(): void {
  }
  
  signUp() {
    const formData = new FormData();
    formData.append('fullname', this.tutorial.fullname);
    formData.append('email', this.tutorial.email);
    formData.append('password', this.tutorial.password);

    this.tutorialservice.registeruser(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
