import { Component } from '@angular/core';
import { OrderService, Project } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.sass'
})
export class OrderDetailsComponent {
  orderId: string | null = null;
  orderName = '';
  
  projects: Project[] = [];
  selectedProject: Project | null = null;
  newProject: Project = this.initEmptyProject();

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    
    if (this.orderId) {
      this.loadAllData();
    }
  }

  loadAllData(): void {
    if (!this.orderId) return;
    this.loadOrder();
    this.loadProjects();
  }

  loadOrder(): void {
    if (!this.orderId) return;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order) => this.orderName = order.orderName,
      error: (err) => console.error('Hiba a rendelés betöltésekor:', err)
    });
  }

  loadProjects(): void {
    if (!this.orderId) return;
    this.orderService.getProjects(this.orderId).subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Hiba a projektek betöltésekor:', err)
    });
  }

  private initEmptyProject(): Project {
    return {
      orderId: this.orderId || '',
      projectName: '',
      description: '',
      projectManager: '',
      price: 0,
      packageDemand: 'Foiled'
    };
  }

}
  