import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { trustcalcService } from "src/app/services/trustcalc.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-scenario",
  templateUrl: "scenario.component.html",
  styleUrls: ['scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  trustcalc = {
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',
    scenarioList: [],
  };
  isEditing: Boolean = false;
  submitted = false;

  constructor(public auth: AuthService, private trustcalcservice: trustcalcService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.trustcalc.emailid = localStorage.getItem('email');
    this.trustcalcservice.getScenarioList(this.trustcalc.emailid).subscribe(data => {
      this.trustcalc.scenarioList = data.scenarioList;
    });
  }

  showDetail(id): void {
    console.log('hererere', id);
    const scenarioId = id;
    if (scenarioId > 0) {
      this.isEditing = true;
      this.trustcalcservice.getScenario(scenarioId).subscribe(data => {
        console.log('dfasdf:', data);
        this.trustcalc.ScenarioName = data.scenarioName;
        this.trustcalc.Description = data.description;
      });
    }
  }

  savetrustcalc(): void {
    const data = {
      ScenarioName: this.trustcalc.ScenarioName,
      ModelLinks: this.trustcalc.ModelLinks,
      LinktoDataset: this.trustcalc.LinktoDataset,
      Description: this.trustcalc.Description,
      emailid: this.trustcalc.emailid,
      Userid: this.trustcalc.Userid
    };

    this.trustcalcservice.create(data)
      .subscribe(
        response => {
          this.router.navigate(['/icons']);
        },
        error => {
          this.toastr.error('Save Failed. Try again with different name', 'Save Failed!');
        }
      );
  };

  updatetrustcalc(): void {
    const scenarioId = this.router.url.substring(6);
    if (scenarioId.length <= 0)
      return;

    if (this.trustcalc.ScenarioName.length <= 0 || this.trustcalc.Description.length <= 0) {
      this.toastr.error("Values can not be empty", "Update Error");
      return;
    }

    const data = {
      id: scenarioId,
      name: this.trustcalc.ScenarioName,
      description: this.trustcalc.Description
    };

    this.trustcalcservice.updateScenario(data).subscribe((data) => {
      this.toastr.info('Successfully Changed');
    })
  }

  deletetrustcalc(): void {
    const scenarioId = this.router.url.substring(6);
    if (scenarioId.length <= 0)
      return;

    console.log('id:', scenarioId);
    if (confirm('Do you really want to delete this scneario?')) {
      this.trustcalcservice.deleteSenario(scenarioId).subscribe(response => {
        this.toastr.info('Successfully deleted', 'DELETE');
        this.router.navigate(['/dashboard']);
      })
    }
  }

  Getdata(id): void {
    this.trustcalcservice.get(id)
      .subscribe(
        response => {
        },
        error => {
        }
      );
  }

}
