import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.sass'
})
export class OrderListComponent {
  searchTerm: string = '';

  constructor(private orderService: OrderService) {
    this.orderService.loadOrders();
  }

  deleteOrder(id: string): void {
    if (confirm('Biztosan törlöd ezt a rendelést?')) {
      this.orderService.deleteOrder(id);
    }
  }

  filteredOrders(): Order[] {
    const list = this.orderService.orders;

    if (!this.searchTerm.trim()) {
      return list;
    }

    return list.filter(order =>
      order.orderName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isExpiringSoon(deadline: string | Date): boolean {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  }
}
