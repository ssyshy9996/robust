import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  tutorial = {
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',
  };
  submitted = false;

  constructor(public auth: AuthService, private tutorialservice: TutorialService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    console.log('paramdId:', this.router.url);

    this.auth.user$.subscribe(user => {
      this.tutorial.emailid = user.email;
      this.tutorial.Userid = user.sub.split('|')[1];
      this.Getdata(user.sub.split('|')[1]);
      console.log("User is:", user);
    });

    const scenarioId = this.router.url.substring(6);
    if (scenarioId.length > 0) {
      this.tutorialservice.getScenario(scenarioId).subscribe(data => {
        console.log('data:', data);
        this.tutorial.ScenarioName = data.scenarioName;
        this.tutorial.Description = data.description;
      });
    }
  }

  saveTutorial(): void {
    const data = {
      ScenarioName: this.tutorial.ScenarioName,
      ModelLinks: this.tutorial.ModelLinks,
      LinktoDataset: this.tutorial.LinktoDataset,
      Description: this.tutorial.Description,
      emailid: this.tutorial.emailid,
      Userid: this.tutorial.Userid
    };

    this.tutorialservice.create(data)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.router.navigate(['/dashboard'])
        },
        error => {
          console.log(error);
        }
      );
  };

  updateTutorial(): void {
    const scenarioId = this.router.url.substring(6);
    if (scenarioId.length <= 0)
      return;
    const data = {
      id: scenarioId,
      name: this.tutorial.ScenarioName,
      description: this.tutorial.Description
    };

    this.tutorialservice.updateScenario(data).subscribe((data) => {
      console.log('update:', data);
      this.toastr.info('Successfully Changed');
    })
  }

  Getdata(id): void {
    this.tutorialservice.get(id)
      .subscribe(
        response => {
          console.log("Response data:", response);
        },
        error => {
          console.log(error);
        }
      );
  }

}
