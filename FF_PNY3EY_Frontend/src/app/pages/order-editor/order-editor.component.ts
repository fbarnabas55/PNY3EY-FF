import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-editor',
  standalone: false,
  templateUrl: './order-editor.component.html',
  styleUrl: './order-editor.component.sass'
})
export class OrderEditorComponent {

  order: Order = new Order();
  id: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, public orderService: OrderService) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.orderService.loadOrderById(this.id);
    }
  }

  save(): void {
    let dataToSave: Order;

    if (this.id && this.orderService.selectedOrder) {
      dataToSave = this.orderService.selectedOrder;
    } else {
      dataToSave = this.order;
    }

    if (!this.isValid(dataToSave)) {
      alert("Hiba: Minden mezőt kötelező kitölteni!");
      return; 
    }

    const successCallback = () => {
      this.router.navigate(['/orders']).then(() => {
        window.location.reload();
      });
    };

    if (this.id) {
      this.orderService.updateOrder(this.id, dataToSave, successCallback);
    } else {
      this.orderService.createOrder(dataToSave, successCallback);
    }
  }

  private isValid(o: Order): boolean {
    if (!o.orderName || o.orderName.trim() === '') return false;
    if (!o.installationAdress || o.installationAdress.trim() === '') return false;
    if (!o.email || o.email.trim() === '') return false;
    if (!o.phoneNumber || o.phoneNumber.trim() === '') return false;
    if (!o.deadline) return false;
    return true;
  }
}
