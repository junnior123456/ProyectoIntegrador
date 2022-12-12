import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chartOptions: Partial<any>;
  public chartOptions2: Partial<any>;
  public chartOptions3: Partial<any>;
  public chartOptions4: Partial<any>;

  constructor(private inscripcionService: InscripcionService, private asistenciaService: AsistenciaService) {
    this.chartOptions = {
      series: [20, 20, 20, 20, 20],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptions2 = {
      series: [
        {
          name: "Inscritos",
          data: [5, 5, 5, 5]
        }
      ],
      chart: {
        height: 215,
        type: "bar"
      },
      colors: [
        "#008FFB"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          "Taller 1",
          "Taller 2",
          "Taller 3",
          "Taller 4"
        ],
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      }
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      }
    };
    this.chartOptions4 = {
      series: [
        {
          data: [
            {
              x: "New Delhi",
              y: 218
            },
            {
              x: "Kolkata",
              y: 149
            },
            {
              x: "Mumbai",
              y: 184
            },
            {
              x: "Ahmedabad",
              y: 55
            },
            {
              x: "Bangaluru",
              y: 84
            },
            {
              x: "Pune",
              y: 31
            },
            {
              x: "Chennai",
              y: 70
            },
            {
              x: "Jaipur",
              y: 30
            },
            {
              x: "Surat",
              y: 44
            },
            {
              x: "Hyderabad",
              y: 68
            },
            {
              x: "Lucknow",
              y: 28
            },
            {
              x: "Indore",
              y: 19
            },
            {
              x: "Kanpur",
              y: 29
            }
          ]
        }
      ],

      chart: {
        height: 350,
        type: "treemap"
      },
      title: {
        text: "Basic Treemap"
      }
    };
    this.inscripcionService.getCantidad().subscribe( (response: any) => {
      var lstSeries = [];
      var lstLabels = [];
      var arrObjData = [];
      for (let i = 0; i < response.data.length; i++) {
        lstLabels.push(response.data[i][0]);
        lstSeries.push(response.data[i][1]);
        arrObjData.push({
          x: response.data[i][0],
          y: response.data[i][1]
        });
      }
      this.chartOptions.series = lstSeries;
      this.chartOptions.labels = lstLabels;

      this.chartOptions2 = {
        series: [
          {
            name: "Inscritos",
            data: lstSeries
          }
        ],
        chart: {
          height: 215,
          type: "bar"
        },
        colors: [
          "#00E396"
        ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: lstLabels,
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
      };

      this.chartOptions4 = {
        series: [
          {
            data: arrObjData
          }
        ],
  
        chart: {
          height: 350,
          type: "treemap"
        }
      };
    });
    this.asistenciaService.getEstadosByTaller().subscribe( (response: any) => {
      var lstEstado0 = [];
      var lstEstado1 = [];
      var lstEstado2 = [];
      var lstLabels = ["Falta", "Tardanza", "Puntual"];
      var lstTalleres = [];

      var tallerA = "";

      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i][0] != tallerA){
          tallerA = response.data[i][0];
          lstTalleres.push(tallerA);
        }
        if(response.data[i][1] == 0){
          lstEstado0.push(response.data[i][2]);
        }
        if(response.data[i][1] == 1){
          lstEstado1.push(response.data[i][2]);
        }
        if(response.data[i][1] == 2){
          lstEstado2.push(response.data[i][2]);
        }
      }

      this.chartOptions3 = {
        series: [
          {
            name: "Falta",
            data: lstEstado0,
            color: "#ff4560"
          },
          {
            name: "Tardanza",
            data: lstEstado1,
            color: "#feb019"
          },
          {
            name: "Puntual",
            data: lstEstado2,
            color: "#00e396"
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: lstTalleres
        },
        yaxis: {
          title: {
            text: "Cantidad de Asistencias"
          }
        },
        fill: {
          opacity: 1
        }
      };
    });
  }

  ngOnInit(): void {
  }

}
