import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.sass'
})
export class StatisticsComponent {

  constructor(public orderService: OrderService) {
    this.orderService.loadStats();
  }


  getMaxOrderCount(): number {
    const list = this.orderService.ordersPerMonth;
    if (!list || list.length === 0) return 1;
    return Math.max(...list.map(d => d.orderCount));
  }

  getMaxProjectCount(): number {
    const list = this.orderService.projectCounts;
    if (!list || list.length === 0) return 1;
    return Math.max(...list.map((d: any) => d.projectCount));
  }
}