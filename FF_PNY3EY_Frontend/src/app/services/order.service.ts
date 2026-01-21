import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://localhost:7218';

  constructor(private http: HttpClient) { }

  // Order műveletek
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/Order`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/Order/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/Order`, order);
  }

  updateOrder(id: string, order: Order): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Order/${id}`, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Order/${id}`);
  }
}

  export interface Order {
  id: string;
  orderName: string;
  installationAdress: string;
  phoneNumber: string;
  email: string;
  deadline: string;     
  startDate: string;
  projects?: Project[];     
  designs?: any[];
  }

  export interface Project {
  id?: string;
  orderId: string;
  projectName: string;
  description: string;
  projectManager: string;
  price: number;
  packageDemand: 'Boxed' | 'Foiled' | 'Stocked';
  }


  export interface SignDesign {
  id?: string;
  orderId: string;
  description: string;
  fixing: string;
  decor: string;
  width: number;
  height: number;
  material: 'Steel' | 'Aluminium' | 'StainlessSteel' | 'Plastic';
  brightness: 'Low' | 'Medium' | 'High';
  lightings: 'LED' | 'Neon' | 'Halogen';
  }


  