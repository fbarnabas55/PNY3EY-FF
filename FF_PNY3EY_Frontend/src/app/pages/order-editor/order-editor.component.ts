import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-editor',
  standalone: false,
  templateUrl: './order-editor.component.html',
  styleUrl: './order-editor.component.sass'
})
export class OrderEditorComponent {

  order: Order = {
    id: '',
    orderName: '',
    installationAdress: '',
    phoneNumber: '',
    email: '',
    deadline: ''
  };

  orderIdToEdit: string | null = null;

  constructor(
    private orderService: OrderService, private router: Router, private route: ActivatedRoute
  ) {
    this.orderIdToEdit = this.route.snapshot.paramMap.get('id');

    if (this.orderIdToEdit) {
      this.orderService.getOrderById(this.orderIdToEdit).subscribe({
        next: (data) => {
          this.order = data;
        },
        error: (err) => {
          console.error('Hiba a betöltéskor:', err);
        }
      });
    }
  }

  onSubmit(): void {

    if (!this.orderIdToEdit) {
      this.orderService.createOrder(this.order).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          console.error('Hiba létrehozáskor:', err);
        }
      });
    } else {
      this.orderService.updateOrder(this.orderIdToEdit, this.order).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          console.error('Hiba frissítéskor:', err);
        }
      });
    }
  }
}
