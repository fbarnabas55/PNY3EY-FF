import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { OrderService } from '../../services/order.service';


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

  ordersPerMonthChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
          precision: 0
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  projectCountChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  projectCountChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private orderService: OrderService) {
    this.loadAllStatistics();
  }

  loadAllStatistics(): void {
    this.loadMaxOrderThisMonth();
    this.loadOrdersPerMonth();
    this.loadProjectCounts();
  }


  loadMaxOrderThisMonth(): void {
    this.orderService.getMaxOrderThisMonth().subscribe({
      next: (data) => {
        if (data) {
          this.maxOrder = {
            name: data.orderName,
            amount: data.totalValue
          };
        }
      },
      error: (err) => console.error('Hiba a max rendelés betöltésekor:', err)
    });
  }

  loadOrdersPerMonth(): void {
    this.orderService.getOrdersPerMonth().subscribe({
      next: (data) => {
        const labels = data.map(d => `${d.year}.${String(d.month).padStart(2, '0')}`);
        const values = data.map(d => d.orderCount);

        this.ordersPerMonthChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Rendelések (db)',
              data: values,
              backgroundColor: '#0d6efd',
              borderColor: '#0a58ca',
              borderWidth: 1
            }
          ]
        };
      },
      error: (err) => console.error('Hiba a havi statisztika betöltésekor:', err)
    });
  }

  loadProjectCounts(): void {
    this.orderService.getProjectCountsPerOrderThisMonth().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.projectCountChartData = {
            labels: data.map((d: any) => d.orderName),
            datasets: [
              {
                data: data.map((d: any) => d.projectCount),
                backgroundColor: [
                  '#0d6efd', '#6610f2', '#198754', '#ffc107', '#dc3545',
                  '#20c997', '#6c757d', '#fd7e14', '#e83e8c', '#6f42c1'
                ],
                hoverOffset: 4
              }
            ]
          };
        }
      },
      error: (err) => console.error('Hiba a projekt statisztika betöltésekor:', err)
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('hu-HU', { 
      style: 'currency', 
      currency: 'HUF', 
      maximumFractionDigits: 0 
    }).format(value);
  }
}
