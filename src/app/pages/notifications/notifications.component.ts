import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public showVal1: boolean = true;
  toggleVal(): void {
    this.showVal1 = !this.showVal1;
  }

  ScenarioName: any;
  SolutionName: any;
  TrainnigDatafile: File;
  TestFile: File;
  FactsheetFile: File;
  ModelFile: File;
  // form: FormGroup;
  tutorial = {
    SelectScenario: '',
    SelectSolution: '',
    NameSolution: '',
    DescriptionSolution: '',
    // TrainingFile: '',
    // TestFile: '',
    // FactsheetFile: '',
    // ModelFile: '',
    Targetcolumn: '',
    // TrainnigDatafile: File,
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',

    accuracy: '',
    classweightedf1score: '',
    classweightedprecision: '',
    classweightedrecall: '',
    globalf1score: '',
    globalprecision: '',
    globalrecall: '',

    ModelType: '',
    NormalizationTechnique: '',
    TrainTestSplit: '',
    RegularizationTechnique: '',
    DataSize: '',
    NumberofFeatures: '',

    modelname: '',
    purposedesc: '',
    trainingdatadesc: '',
    modelinfo: '',
    authors: '',
    contactinfo: '',

    fairness_score: '',
    explainability_score: '',
    methodology_score: '',
    robustness_score: '',

    underfitting: '',
    overfitting: '',
    statistical_parity_difference: '',
    equal_opportunity_difference: '',
    average_odds_difference: '',
    disparate_impact: '',
    class_balance: '',

    algorithm_class: '',
    correlated_features: '',
    model_size: '',
    feature_relevance: '',

    confidence_score: '',
    clique_method: '',
    loss_sensitivity: '',
    clever_score: '',
    er_fast_gradient_attack: '',
    er_carlini_wagner_attack: '',
    er_deepfool_attack: '',

    normalization: '',
    missing_data: '',
    regularization: '',
    train_test_split: '',
    factsheet_completeness: '',

  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService) { }

  ngOnInit() {
    this.tutorial.emailid = localStorage.getItem('email');
    this.tutorialservice.get(localStorage.getItem('email')).subscribe((data: any) => {
      this.ScenarioName = data.ScenarioName;
      console.log("ScenarioNameList:", data.ScenarioName);
    });
    this.tutorialservice.getsolution(localStorage.getItem('email')).subscribe((data: any) => {
      this.SolutionName = data.SolutionName;
      console.log("ScenarioNameList:", data.SolutionName);
    });
    // this.form = this.formBuilder.group({
    //   profile: ['']
    // });
    // console.log("User is:",user);


    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
    this.canvas = document.getElementById("CountryChart");

    if (this.canvas != null) {
      this.ctx = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    }

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }


  saveTutorial(): void {
    const formData = new FormData();
    console.log('emial:', this.tutorial);
    formData.append('Userid', this.tutorial.Userid);
    formData.append('emailid', this.tutorial.emailid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('SelectSolution', this.tutorial.SelectSolution);

    this.tutorialservice.analyzesolution(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.tutorial.ScenarioName = response.ScenarioName;
          this.tutorial.LinktoDataset = response.LinktoDataset;
          this.tutorial.Description = response.Description;

          this.tutorial.accuracy = response.accuracy;
          this.tutorial.classweightedf1score = response.classweightedf1score;
          this.tutorial.classweightedprecision = response.classweightedprecision;
          this.tutorial.classweightedrecall = response.classweightedrecall;
          this.tutorial.globalf1score = response.globalf1score;
          this.tutorial.globalprecision = response.globalprecision;
          this.tutorial.globalrecall = response.globalrecall;

          this.tutorial.ModelType = response.ModelType;
          this.tutorial.NormalizationTechnique = response.NormalizationTechnique;
          this.tutorial.TrainTestSplit = response.TrainTestSplit;
          this.tutorial.RegularizationTechnique = response.RegularizationTechnique;
          this.tutorial.DataSize = response.DataSize;
          this.tutorial.NumberofFeatures = response.NumberofFeatures;

          this.tutorial.modelname = response.modelname;
          this.tutorial.purposedesc = response.purposedesc;
          this.tutorial.trainingdatadesc = response.trainingdatadesc;
          this.tutorial.modelinfo = response.modelinfo;
          this.tutorial.authors = response.authors;
          this.tutorial.contactinfo = response.contactinfo;

          this.tutorial.fairness_score = response.fairness_score;
          this.tutorial.explainability_score = response.explainability_score;
          this.tutorial.methodology_score = response.methodology_score;
          this.tutorial.robustness_score = response.robustness_score;

          this.tutorial.underfitting = response.underfitting;
          this.tutorial.overfitting = response.overfitting;
          this.tutorial.statistical_parity_difference = response.statistical_parity_difference;
          this.tutorial.equal_opportunity_difference = response.equal_opportunity_difference;
          this.tutorial.average_odds_difference = response.average_odds_difference;
          this.tutorial.disparate_impact = response.disparate_impact;
          this.tutorial.class_balance = response.class_balance;

          this.tutorial.algorithm_class = response.algorithm_class;
          this.tutorial.correlated_features = response.correlated_features;
          this.tutorial.model_size = response.model_size;
          this.tutorial.feature_relevance = response.feature_relevance;

          this.tutorial.confidence_score = response.confidence_score;
          this.tutorial.clique_method = response.clique_method;
          this.tutorial.loss_sensitivity = response.loss_sensitivity;
          this.tutorial.clever_score = response.clever_score;
          this.tutorial.er_fast_gradient_attack = response.er_fast_gradient_attack;
          this.tutorial.er_carlini_wagner_attack = response.er_carlini_wagner_attack;
          this.tutorial.er_deepfool_attack = response.er_deepfool_attack;

          this.tutorial.normalization = response.normalization;
          this.tutorial.missing_data = response.missing_data;
          this.tutorial.regularization = response.regularization;
          this.tutorial.train_test_split = response.train_test_split;
          this.tutorial.factsheet_completeness = response.factsheet_completeness;
        },
        error => {
          console.log(error);
        }
      )
  };

}
