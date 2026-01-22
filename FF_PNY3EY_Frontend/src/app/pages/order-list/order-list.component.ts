import { Component } from '@angular/core';
import { Order, OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.sass'
})
export class OrderListComponent {
  orders: Order[] = [];
  searchTerm: string = '';
  isDark = false;

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  deleteOrder(id: string): void {
    if (confirm('Biztosan törlöd ezt a rendelést?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== id);
      });
    }
  }

  filteredOrders(): Order[] {
    if (!this.searchTerm.trim()) {
      return this.orders;
    }

    return this.orders.filter(order =>
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
