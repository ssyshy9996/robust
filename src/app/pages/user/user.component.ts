import { Component, OnInit } from "@angular/core";
import { TutorialService } from "src/app/services/tutorial.service";
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  tutorial = {
    fullname: '',
    email: '',
    password: '',
  };

  constructor(public auth: AuthService, private tutorialService: TutorialService, private toastr: ToastrService) { }

  ngOnInit() {
    this.tutorial.email = localStorage.getItem('email');
    this.tutorial.password = localStorage.getItem('password');
  }

  saveUser() {
    this.tutorialService.updateUser({
      email: this.tutorial.email,
      password: this.tutorial.password,
    }).subscribe(data => {
      console.log('d:', data);
      this.toastr.info("password has successfully changed");
    });
  }
}
