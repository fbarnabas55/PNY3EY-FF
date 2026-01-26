import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Project } from '../models/project';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://localhost:7218';

  orders: Order[] = [];
  projects: Project[] = []; 
  designs: Design[] = [];
  selectedOrder: Order | null = null; 

  maxOrder: any = null;
  ordersPerMonth: any[] = [];
  projectCounts: any[] = [];

  constructor(private http: HttpClient) { }

  loadOrders(): void {
    this.http.get<Order[]>(`${this.baseUrl}/Order`).subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Rendelések betöltve:', this.orders);
      },
      error: (err) => console.error('Hiba a rendelések betöltésekor:', err)
    });
  }

  loadOrderById(id: string): void {
    this.http.get<Order>(`${this.baseUrl}/Order/${id}`).subscribe({
      next: (data) => {
        if (data.deadline) {
            data.deadline = data.deadline.toString().split('T')[0];
        }
        if (data.startDate) {
             data.startDate = data.startDate.toString().split('T')[0];
        }
        this.selectedOrder = data;
      },
      error: (err) => console.error('Hiba:', err)
    });
  }

  createOrder(order: Order, onSuccess?: () => void): void {
    this.http.post<Order>(`${this.baseUrl}/Order`, order).subscribe({
      next: (newOrder) => {
        this.orders.push(newOrder);
        if (onSuccess) {
          onSuccess();
        }
      },
      error: (err) => console.error('Hiba létrehozáskor:', err)
    });
  }

updateOrder(id: string, order: Order, onSuccess?: () => void): void {
    this.http.put<void>(`${this.baseUrl}/Order/${id}`, order).subscribe({
      next: () => {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
          this.orders[index] = order;
        }
        if (onSuccess) {
          onSuccess();
        }
      },
      error: (err) => console.error('Hiba frissítéskor:', err)
    });
  }

  deleteOrder(id: string): void {
    this.http.delete<void>(`${this.baseUrl}/Order/${id}`).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.id !== id);
      },
      error: (err) => console.error('Hiba törléskor:', err)
    });
  }





  loadProjects(orderId: string): void {
    this.http.get<Project[]>(`${this.baseUrl}/Project/order/${orderId}`).subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error(err)
    });
  }

  createProject(project: Project, packageDemand: string, onSuccess?: () => void): void {
    const params = { packageDemand };
    this.http.post<Project>(`${this.baseUrl}/Project`, project, { params }).subscribe({
      next: () => {
        this.loadProjects(project.orderId);
        
        if (onSuccess) onSuccess();
      },
      error: (err) => console.error('Hiba:', err)
    });
  }

  updateProject(project: Project, packageDemand: string, onSuccess?: () => void): void {
    const params = { packageDemand };
    if (!project.id) return;

    this.http.put<void>(`${this.baseUrl}/Project/${project.id}`, project, { params }).subscribe({
      next: () => {
        const index = this.projects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            this.projects[index] = project;
            this.projects = [...this.projects];
        }
        if (onSuccess) onSuccess();
      },
      error: (err) => console.error(err)
    });
  }

  deleteProject(projectId: string): void {
    this.http.delete<void>(`${this.baseUrl}/Project/${projectId}`).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== projectId);
      },
      error: (err) => console.error('Hiba projekt törlésekor:', err)
    });
  }





  loadDesigns(orderId: string): void {
    this.http.get<Design[]>(`${this.baseUrl}/SignDesign/order/${orderId}`).subscribe({
      next: (data) => this.designs = data,
      error: (err) => console.error(err)
    });
  }

  createDesign(design: Design, onSuccess?: () => void): void {
    const params = {
      lightings: design.lightings,
      brightness: design.brightness,
      material: design.material
    };

    this.http.post<Design>(`${this.baseUrl}/SignDesign`, design, { params }).subscribe({
      next: () => {
        this.loadDesigns(design.orderId);
        
        if (onSuccess) onSuccess();
      },
      error: (err) => console.error(err)
    });
  }

  updateDesign(design: Design, onSuccess?: () => void): void {
    if (!design.id) return;
    this.http.put<void>(`${this.baseUrl}/SignDesign/${design.id}`, design).subscribe({
      next: () => {
        const index = this.designs.findIndex(d => d.id === design.id);
        if (index !== -1) {
            this.designs[index] = design;
            this.designs = [...this.designs];
        }
        if (onSuccess) onSuccess();
      },
      error: (err) => console.error(err)
    });
  }

  deleteDesign(id: string): void {
    this.http.delete<void>(`${this.baseUrl}/SignDesign/${id}`).subscribe({
      next: () => {
        this.designs = this.designs.filter(d => d.id !== id);
      },
      error: (err) => console.error('Hiba design törlésekor:', err)
    });
  }





  loadStats(): void {
    this.http.get(`${this.baseUrl}/Order/stats/max-order-current-month`).subscribe({
      next: (data) => this.maxOrder = data,
      error: (e) => console.error(e)
    });


    this.http.get<any[]>(`${this.baseUrl}/Order/stats/orders-per-month`).subscribe({
      next: (data) => this.ordersPerMonth = data,
      error: (e) => console.error(e)
    });


    this.http.get(`${this.baseUrl}/Order/stats/project-counts-per-order`).subscribe({
      next: (data: any) => this.projectCounts = data,
      error: (e) => console.error(e)
    });
  }
}  