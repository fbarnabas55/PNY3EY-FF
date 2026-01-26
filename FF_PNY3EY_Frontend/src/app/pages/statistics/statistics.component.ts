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
    
    const max = Math.max(...list.map(d => d.orderCount));
    return max === 0 ? 1 : max;
  }

  getMaxProjectCount(): number {
    const list = this.orderService.projectCounts;
    if (!list || list.length === 0) return 1;
    
    const max = Math.max(...list.map((d: any) => d.projectCount));
    return max === 0 ? 1 : max;
  }
}