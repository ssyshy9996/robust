import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  ScenarioName: any;
  SolutionName: any;

  tutorial = {
    SelectScenario: '',
    SelectSolution1: '',
    SelectSolution2: '',
    emailid: '',
    Userid: '',

    accuracy: '',
    classweightedf1score: '',
    classweightedprecision: '',
    classweightedrecall: '',
    globalf1score: '',
    globalprecision: '',
    globalrecall: '',

    accuracy2: '',
    classweightedf1score2: '',
    classweightedprecision2: '',
    classweightedrecall2: '',
    globalf1score2: '',
    globalprecision2: '',
    globalrecall2: '',

    modelname1: '',
    purposedesc1: '',
    trainingdatadesc1: '',
    modelinfo1: '',
    authors1: '',
    contactinfo1: '',
    modelname2: '',
    purposedesc2: '',
    trainingdatadesc2: '',
    modelinfo2: '',
    authors2: '',
    contactinfo2: '',


    fairness_score1: '',
    explainability_score1: '',
    methodology_score1: '',
    robustness_score1: '',
    trust_score1: '',

    fairness_score2: '',
    explainability_score2: '',
    methodology_score2: '',
    robustness_score2: '',
    trust_score2: '',
  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.tutorial.Userid = user.sub.split('|')[1];
      this.tutorial.emailid = user.email;
      this.tutorialservice.get(user.email).subscribe((data: any) => {
        this.ScenarioName = data.ScenarioName;
        console.log("ScenarioNameList:", data.ScenarioName);
      });
      this.tutorialservice.getsolution(user.email).subscribe((data: any) => {
        this.SolutionName = data.SolutionName;
        console.log("ScenarioNameList:", data.SolutionName);
      });
    });
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('emailid', this.tutorial.emailid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('SelectSolution1', this.tutorial.SelectSolution1);
    formData.append('SelectSolution2', this.tutorial.SelectSolution2);

    this.tutorialservice.comparesolution(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.tutorial.accuracy = response.accuracy;
          this.tutorial.classweightedf1score = response.classweightedf1score;
          this.tutorial.classweightedprecision = response.classweightedprecision;
          this.tutorial.classweightedrecall = response.classweightedrecall;
          this.tutorial.globalf1score = response.globalf1score;
          this.tutorial.globalprecision = response.globalprecision;
          this.tutorial.globalrecall = response.globalrecall;

          this.tutorial.accuracy2 = response.accuracy2;
          this.tutorial.classweightedf1score2 = response.classweightedf1score2;
          this.tutorial.classweightedprecision2 = response.classweightedprecision2;
          this.tutorial.classweightedrecall2 = response.classweightedrecall2;
          this.tutorial.globalf1score2 = response.globalf1score2;
          this.tutorial.globalprecision2 = response.globalprecision2;
          this.tutorial.globalrecall2 = response.globalrecall2;

          this.tutorial.modelname1 = response.modelname1;
          this.tutorial.purposedesc1 = response.purposedesc1;
          this.tutorial.trainingdatadesc1 = response.trainingdatadesc1;
          this.tutorial.modelinfo1 = response.modelinfo1;
          this.tutorial.authors1 = response.authors1;
          this.tutorial.contactinfo1 = response.contactinfo1;

          this.tutorial.modelname2 = response.modelname2;
          this.tutorial.purposedesc2 = response.purposedesc2;
          this.tutorial.trainingdatadesc2 = response.trainingdatadesc2;
          this.tutorial.modelinfo2 = response.modelinfo2;
          this.tutorial.authors2 = response.authors2;
          this.tutorial.contactinfo2 = response.contactinfo2;



          this.tutorial.fairness_score1 = response.fairness_score1;
          this.tutorial.explainability_score1 = response.explainability_score1;
          this.tutorial.methodology_score1 = response.methodology_score1;
          this.tutorial.robustness_score1 = response.robustness_score1;
          this.tutorial.trust_score1 = response.trust_score1;

          this.tutorial.fairness_score2 = response.fairness_score2;
          this.tutorial.explainability_score2 = response.explainability_score2;
          this.tutorial.methodology_score2 = response.methodology_score2;
          this.tutorial.robustness_score2 = response.robustness_score2;
          this.tutorial.trust_score2 = response.trust_score2;
        },
        error => {
          console.log(error);
        }
      );
  };

}
