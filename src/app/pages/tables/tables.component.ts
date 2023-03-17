import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { Chart } from 'chart.js';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  ScenarioName: any;
  SolutionName: any;

  public chartItemLabels: any = {
    trust: ['FAIRNESS', 'EXPLAINABILITY', 'ROBUSTNESS', 'ACCOUNTABILITY'],
    fair: ['UNDERFITTING', 'Statistical Parity Difference', 'Equal Opportunity Difference', 'Average Odds Difference', 'Disperate Impact', 'Class Balance'],
    explain: ['Algorithm Class', 'Correlated Features', 'Model Size', 'Feature Relevance'],
    robust: ['Confidence Score', 'CLIQUE_METHOD_SCORE', 'LOSS_SENSITIVITY', 'CLEVER_SCORE', 'ER_FAST_GRADIENT_SCORE', 'ER_CARLINI_WAGNER_ATTACK_SCORE', 'ER_DEEPFOOL_ATTACK'],
    account: ['Normalization', 'Missing Data', 'Regularization', 'Train Test Split', 'Factsheet Completeness']
  };

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

    fair: {
      underfitting1: '',
      overfitting1: '',
      statistical_parity_difference1: '',
      equal_opportunity_difference1: '',
      average_odds_difference1: '',
      disperate_impact1: '',
      class_balance1: '',

      underfitting2: '',
      overfitting2: '',
      statistical_parity_difference2: '',
      equal_opportunity_difference2: '',
      average_odds_difference2: '',
      disperate_impact2: '',
      class_balance2: '',
    },

    explain: {
      algorithm1: '',
      correlated1: '',
      model_size1: '',
      feature_relevance1: '',

      algorithm2: '',
      correlated2: '',
      model_size2: '',
      feature_relevance2: '',
    },

    robust: {
      confidence_score1: '',
      clique_method1: '',
      loss_sensitivity1: '',
      clever_score1: '',
      er_fast_gradient_attack1: '',
      er_carlini_wagner_attack1: '',
      er_deepfool_attack1: '',

      confidence_score2: '',
      clique_method2: '',
      loss_sensitivity2: '',
      clever_score2: '',
      er_fast_gradient_attack2: '',
      er_carlini_wagner_attack2: '',
      er_deepfool_attack2: '',
    },

    account: {
      normalization1: '',
      missing_data1: '',
      regularization1: '',
      train_test_split1: '',
      factsheet_completeness1: '',

      normalization2: '',
      missing_data2: '',
      regularization2: '',
      train_test_split2: '',
      factsheet_completeness2: '',
    }
  };

  public chartOptions = {
    type: 'bar',
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  public dataset = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)"
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)"
    ],
    borderWidth: 1
  };

  public trustChart1: Chart;
  public trustChart2: Chart;
  public fairnessChart1: Chart;
  public fairnessChart2: Chart;
  public explainChart1: Chart;
  public explainChart2: Chart;
  public robustChart1: Chart;
  public robustChart2: Chart;
  public accountChart1: Chart;
  public accountChart2: Chart;

  constructor(public auth: AuthService, private tutorialservice: TutorialService) { }

  ngOnInit() {
    this.tutorialservice.get(localStorage.getItem('email')).subscribe((data: any) => {
      this.ScenarioName = data.ScenarioName;
      console.log("ScenarioNameList:", data.ScenarioName);
    });
    this.tutorialservice.getsolution(localStorage.getItem('email')).subscribe((data: any) => {
      this.SolutionName = data.SolutionName;
      console.log("ScenarioNameList:", data.SolutionName);
    });
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('emailid', localStorage.getItem('email'));
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
          // Scores.. for chart.
          this.tutorial.fairness_score1 = response.fairness_score1;
          this.tutorial.explainability_score1 = response.explainability_score1;
          this.tutorial.methodology_score1 = response.methodology_score1;
          this.tutorial.robustness_score1 = response.robustness_score1;
          this.tutorial.trust_score1 = response.trust_score1;

          this.trustChart1 = new Chart("canvas1", {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.trust,
              datasets: [
                {
                  label: "TRUSTWORTHINESS OVERALL SCORE",
                  data: [response.fairness_score1, response.explainability_score1, response.robustness_score1, response.methodology_score1],
                  ...this.dataset,
                }
              ]
            },
          });

          this.tutorial.fairness_score2 = response.fairness_score2;
          this.tutorial.explainability_score2 = response.explainability_score2;
          this.tutorial.methodology_score2 = response.methodology_score2;
          this.tutorial.robustness_score2 = response.robustness_score2;
          this.tutorial.trust_score2 = response.trust_score2;

          this.trustChart2 = new Chart("canvas2", {
            data: {
              labels: this.chartItemLabels.trust,
              datasets: [
                {
                  label: "TRUSTWORTHINESS OVERALL SCORE",
                  data: [response.fairness_score2, response.explainability_score2, response.robustness_score2, response.methodology_score2],
                  ...this.dataset,
                }
              ]
            },
            ...this.chartOptions,
          });

          this.tutorial.fair.underfitting1 = response.underfitting;
          this.tutorial.fair.overfitting1 = response.overfitting;
          this.tutorial.fair.statistical_parity_difference1 = response.statistical_parity_difference;
          this.tutorial.fair.equal_opportunity_difference1 = response.equal_opportunity_difference;
          this.tutorial.fair.average_odds_difference1 = response.average_odds_difference;
          this.tutorial.fair.disperate_impact1 = response.disparate_impact;
          this.tutorial.fair.class_balance1 = response.class_balance;

          this.fairnessChart1 = new Chart('canvas3', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.fair,
              datasets: [
                {
                  label: "FAIRNESS SCORE",
                  data: [
                    response.underfitting,
                    response.overfitting,
                    response.statistical_parity_difference,
                    response.equal_opportunity_difference,
                    response.average_odds_difference,
                    response.disparate_impact,
                    response.class_balance,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.fair.underfitting2 = response.underfitting2;
          this.tutorial.fair.overfitting2 = response.overfitting2;
          this.tutorial.fair.statistical_parity_difference2 = response.statistical_parity_difference2;
          this.tutorial.fair.equal_opportunity_difference2 = response.equal_opportunity_difference2;
          this.tutorial.fair.average_odds_difference2 = response.average_odds_difference2;
          this.tutorial.fair.disperate_impact2 = response.disparate_impact2;
          this.tutorial.fair.class_balance2 = response.class_balance2;

          this.fairnessChart2 = new Chart('canvas4', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.fair,
              datasets: [
                {
                  label: "FAIRNESS SCORE",
                  data: [
                    response.underfitting2,
                    response.overfitting2,
                    response.statistical_parity_difference2,
                    response.equal_opportunity_difference2,
                    response.average_odds_difference2,
                    response.disparate_impact2,
                    response.class_balance2,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.explain.algorithm1 = response.algorithm_class;
          this.tutorial.explain.correlated1 = response.correlated_features;
          this.tutorial.explain.model_size1 = response.model_size;
          this.tutorial.fairness_score1 = response.feature_relevance;

          this.explainChart1 = new Chart('canvas5', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.explain,
              datasets: [
                {
                  label: "EXPLAINABILITY SCORE",
                  data: [
                    response.algorithm_class,
                    response.correlated_features,
                    response.model_size,
                    response.feature_relevance,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.explain.algorithm2 = response.algorithm_class2;
          this.tutorial.explain.correlated2 = response.correlated_features2;
          this.tutorial.explain.model_size2 = response.model_size2;
          this.tutorial.fairness_score2 = response.feature_relevance2;

          this.explainChart2 = new Chart('canvas6', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.explain,
              datasets: [
                {
                  label: "EXPLAINABILITY SCORE",
                  data: [
                    response.algorithm_class2,
                    response.correlated_features2,
                    response.model_size2,
                    response.feature_relevance2,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.robust.confidence_score1 = response.confidence_score;
          this.tutorial.robust.clique_method1 = response.clique_method;
          this.tutorial.robust.loss_sensitivity1 = response.loss_sensitivity;
          this.tutorial.robust.clever_score1 = response.clever_score;
          this.tutorial.robust.er_fast_gradient_attack1 = response.er_fast_gradient_attack;
          this.tutorial.robust.er_carlini_wagner_attack1 = response.er_carlini_wagner_attack;
          this.tutorial.robust.er_deepfool_attack1 = response.er_deepfool_attack;

          this.tutorial.robust.confidence_score2 = response.confidence_score2;
          this.tutorial.robust.clique_method2 = response.clique_method2;
          this.tutorial.robust.loss_sensitivity2 = response.loss_sensitivity2;
          this.tutorial.robust.clever_score2 = response.clever_score2;
          this.tutorial.robust.er_fast_gradient_attack2 = response.er_fast_gradient_attack2;
          this.tutorial.robust.er_carlini_wagner_attack2 = response.er_carlini_wagner_attack2;
          this.tutorial.robust.er_deepfool_attack2 = response.er_deepfool_attack2;

          this.robustChart1 = new Chart('canvas7', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.robust,
              datasets: [
                {
                  label: "CONFIDENCE SCORE",
                  data: [
                    response.confidence_score,
                    response.clique_method,
                    response.loss_sensitivity,
                    response.clever_score,
                    response.er_fast_gradient_attack,
                    response.er_carlini_wagner_attack,
                    response.er_deepfool_attack,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.robustChart2 = new Chart('canvas8', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.robust,
              datasets: [
                {
                  label: "CONFIDENCE SCORE",
                  data: [
                    response.confidence_score2,
                    response.clique_method2,
                    response.loss_sensitivity2,
                    response.clever_score2,
                    response.er_fast_gradient_attack2,
                    response.er_carlini_wagner_attack2,
                    response.er_deepfool_attack2,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.account.normalization1 = response.normalization;
          this.tutorial.account.missing_data1 = response.missing_data;
          this.tutorial.account.regularization1 = response.regularization;
          this.tutorial.account.train_test_split1 = response.train_test_split;
          this.tutorial.account.factsheet_completeness1 = response.factsheet_completeness;

          this.accountChart1 = new Chart('canvas9', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.account,
              datasets: [
                {
                  label: "CONFIDENCE SCORE",
                  data: [
                    response.normalization,
                    response.missing_data,
                    response.regularization,
                    response.train_test_split,
                    response.factsheet_completeness,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });

          this.tutorial.account.normalization2 = response.normalization2;
          this.tutorial.account.missing_data2 = response.missing_data2;
          this.tutorial.account.regularization2 = response.regularization2;
          this.tutorial.account.train_test_split2 = response.train_test_split2;
          this.tutorial.account.factsheet_completeness2 = response.factsheet_completeness2;

          this.accountChart2 = new Chart('canvas10', {
            ...this.chartOptions,
            data: {
              labels: this.chartItemLabels.account,
              datasets: [
                {
                  label: "CONFIDENCE SCORE",
                  data: [
                    response.normalization2,
                    response.missing_data2,
                    response.regularization2,
                    response.train_test_split2,
                    response.factsheet_completeness2,
                  ],
                  ...this.dataset,
                }
              ]
            }
          });
        },
        error => {
          console.log(error);
        }
      );
  };

}
