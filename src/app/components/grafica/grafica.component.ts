import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CalificacionesComponent } from '../calificaciones/calificaciones.component';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  canvas:any;
  ctx:any;

  BuildChart(labels:any, values:any){
    this.canvas = document.getElementById("graphcal");
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Calificación',
          data: values
        }]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false
      }
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

}
