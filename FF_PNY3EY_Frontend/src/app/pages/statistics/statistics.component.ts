import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.sass'
})
export class StatisticsComponent {

  maxOrder: { name: string; amount: number } | null = null;

  ordersPerMonthChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

}
