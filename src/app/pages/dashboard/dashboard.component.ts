import { Component, OnInit } from "@angular/core";
import { Chart } from 'chart.js';
import { AuthService } from "@auth0/auth0-angular";
import { TutorialService } from "src/app/services/tutorial.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;


  tutorial = {
    SelectScenario: '',
    SelectSolution1: '',
    SelectSolution2: '',
    Userid: '',

    fairness_score: '',
    explainability_score: '',
    methodology_score: '',
    robustness_score: '',
    trust_score: '',

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


    unsupervised_fairness_score: '',
    unsupervised_explainability_score: '',
    unsupervised_methodology_score: '',
    unsupervised_robustness_score: '',
    unsupervised_trust_score: '',


    unsupervised_underfitting: '',
    unsupervised_overfitting: '',
    unsupervised_statistical_parity_difference: '',
    unsupervised_equal_opportunity_difference: '',
    unsupervised_average_odds_difference: '',
    unsupervised_disparate_impact: '',
    unsupervised_class_balance: '',

    unsupervised_algorithm_class: '',
    unsupervised_correlated_features: '',
    unsupervised_model_size: '',
    unsupervised_permutation_importance: '',

    unsupervised_confidence_score: '',
    unsupervised_clique_method: '',
    unsupervised_loss_sensitivity: '',
    unsupervised_clever_score: '',
    unsupervised_er_fast_gradient_attack: '',
    unsupervised_er_carlini_wagner_attack: '',
    unsupervised_er_deepfool_attack: '',

    unsupervised_normalization: '',
    unsupervised_missing_data: '',
    unsupervised_regularization: '',
    unsupervised_train_test_split: '',
    unsupervised_factsheet_completeness: '',

    scenarioList: [],
    solutionList: [],
  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService) { }

  ngOnInit() {

    // this.tutorial.Userid = user.sub.split('|')[1];
    this.tutorialservice.dashboard(localStorage.getItem('email')).subscribe((data: any) => {
      // this.ScenarioName=data.ScenarioName;
      this.tutorial.fairness_score = data.fairness_score;
      this.tutorial.explainability_score = data.explainability_score;
      this.tutorial.methodology_score = data.methodology_score;
      this.tutorial.robustness_score = data.robustness_score;

      this.tutorial.underfitting = data.underfitting;
      this.tutorial.overfitting = data.overfitting;
      this.tutorial.statistical_parity_difference = data.statistical_parity_difference;
      this.tutorial.equal_opportunity_difference = data.equal_opportunity_difference;
      this.tutorial.average_odds_difference = data.average_odds_difference;
      this.tutorial.disparate_impact = data.disparate_impact;
      this.tutorial.class_balance = data.class_balance;

      this.tutorial.algorithm_class = data.algorithm_class;
      this.tutorial.correlated_features = data.correlated_features;
      this.tutorial.model_size = data.model_size;
      this.tutorial.feature_relevance = data.feature_relevance;

      this.tutorial.confidence_score = data.confidence_score;
      this.tutorial.clique_method = data.clique_method;
      this.tutorial.loss_sensitivity = data.loss_sensitivity;
      this.tutorial.clever_score = data.clever_score;
      this.tutorial.er_fast_gradient_attack = data.er_fast_gradient_attack;
      this.tutorial.er_carlini_wagner_attack = data.er_carlini_wagner_attack;
      this.tutorial.er_deepfool_attack = data.er_deepfool_attack;

      this.tutorial.normalization = data.normalization;
      this.tutorial.missing_data = data.missing_data;
      this.tutorial.regularization = data.regularization;
      this.tutorial.train_test_split = data.train_test_split;
      this.tutorial.factsheet_completeness = data.factsheet_completeness;



      this.tutorial.unsupervised_fairness_score = data.unsupervised_fairness_score;
      this.tutorial.unsupervised_explainability_score = data.unsupervised_explainability_score;
      this.tutorial.unsupervised_methodology_score = data.unsupervised_methodology_score;
      this.tutorial.unsupervised_robustness_score = data.unsupervised_robustness_score;

      this.tutorial.unsupervised_underfitting = data.unsupervised_underfitting;
      this.tutorial.unsupervised_overfitting = data.unsupervised_overfitting;
      this.tutorial.unsupervised_statistical_parity_difference = data.unsupervised_statistical_parity_difference;
      // this.tutorial.unsupervised_equal_opportunity_difference =data.unsupervised_equal_opportunity_difference;
      // this.tutorial.unsupervised_average_odds_difference =data.unsupervised_average_odds_difference;
      this.tutorial.unsupervised_disparate_impact = data.unsupervised_disparate_impact;
      // this.tutorial.unsupervised_class_balance =data.unsupervised_class_balance;

      // this.tutorial.unsupervised_algorithm_class =data.unsupervised_algorithm_class;
      this.tutorial.unsupervised_correlated_features = data.unsupervised_correlated_features;
      this.tutorial.unsupervised_model_size = data.unsupervised_model_size;
      this.tutorial.unsupervised_permutation_importance = data.unsupervised_permutation_importance;

      // this.tutorial.unsupervised_confidence_score =data.unsupervised_confidence_score;
      // this.tutorial.unsupervised_clique_method =data.unsupervised_clique_method;
      // this.tutorial.unsupervised_loss_sensitivity =data.unsupervised_loss_sensitivity;
      this.tutorial.unsupervised_clever_score = data.unsupervised_clever_score;
      // this.tutorial.unsupervised_er_fast_gradient_attack =data.unsupervised_er_fast_gradient_attack;
      // this.tutorial.unsupervised_er_carlini_wagner_attack =data.unsupervised_er_carlini_wagner_attack;
      // this.tutorial.unsupervised_er_deepfool_attack =data.unsupervised_er_deepfool_attack;

      this.tutorial.unsupervised_normalization = data.unsupervised_normalization;
      this.tutorial.unsupervised_missing_data = data.unsupervised_missing_data;
      this.tutorial.unsupervised_regularization = data.unsupervised_regularization;
      this.tutorial.unsupervised_train_test_split = data.unsupervised_train_test_split;
      this.tutorial.unsupervised_factsheet_completeness = data.unsupervised_factsheet_completeness;

      this.tutorial.scenarioList = data.scenarioList;
      this.tutorial.solutionList = data.solutionList;
    });

    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
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
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


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

    this.canvas = document.getElementById("chartLineRed");
    if (this.canvas != null) {
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var data = {
        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Data",

          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 100, 70, 80, 120, 80],
        }]
      };
    }


    this.canvas = document.getElementById("chartLineGreen");

    if (this.canvas != null) {
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      var data = {
        labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
        datasets: [{
          label: "My First dataset",

          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80],
        }]
      };

    }

    var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[0];

    this.canvas = document.getElementById("chartBig1");
    if (this.canvas != null) {
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var config = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: "My First dataset",

            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: gradientChartOptionsConfigurationWithTooltipRed
      };
    }

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
}
