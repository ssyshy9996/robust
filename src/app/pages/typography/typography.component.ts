import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { TutorialService } from "src/app/services/tutorial.service";

@Component({
  selector: "app-typography",
  templateUrl: "typography.component.html"
})
export class TypographyComponent implements OnInit {

  ScenarioName: any;
  SolutionName: any;
  TrainnigDatafile: File;
  TestFile: File;
  FactsheetFile: File;
  ModelFile: File;
  Admintag = [];
  users: any;
  userScenario: any;
  userSolution: any;

  tutorial = {
    userinfo: '',
  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService) { }

  ngOnInit() {

    const email = localStorage.getItem('email');
    this.tutorialservice.get(email).subscribe((data: any) => {
      this.ScenarioName = data.ScenarioName;
      console.log("ScenarioNameList:", data.ScenarioName);
    });
    this.tutorialservice.getsolution(email).subscribe((data: any) => {
      this.SolutionName = data.SolutionName;
      console.log("ScenarioNameList:", data.SolutionName);
    });
    this.tutorialservice.userpageUrl(email).subscribe((data: any) => {
      this.Admintag = data.Admin;
      this.users = data.users;
      console.log("admin data:", data);
    });
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Useremail', this.tutorial.userinfo);
    //formData.append('SelectScenario', this.tutorial.SelectScenario);
    //formData.append('SelectSolution', this.tutorial.SelectSolution);

    this.tutorialservice.userdetails(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.userScenario = response.ScenarioName;
          this.userSolution = response.SolutionName;

        },
        error => {
          console.log(error);
        }
      );
  };
}
