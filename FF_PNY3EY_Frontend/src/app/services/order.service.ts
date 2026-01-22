import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'https://localhost:7218';

  constructor(private http: HttpClient) { }

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




  getProjects(orderId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/Project/order/${orderId}`);
  }

  createProject(project: Project, packageDemand: string): Observable<Project> {
    const params = { packageDemand };
    return this.http.post<Project>(`${this.baseUrl}/Project`, project, { params });
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Project/${projectId}`);
  }

  updateProject(project: Project, packageDemand: string): Observable<void> {
    const params = { packageDemand };
    return this.http.put<void>(`${this.baseUrl}/Project/${project.id}`, project, { params });
  }




  getSignDesigns(orderId: string): Observable<SignDesign[]> {
    return this.http.get<SignDesign[]>(`${this.baseUrl}/SignDesign/order/${orderId}`);
  }

  createSignDesign(design: SignDesign): Observable<SignDesign> {
    const params = {
      lightings: design.lightings,
      brightness: design.brightness,
      material: design.material
    };
    return this.http.post<SignDesign>(`${this.baseUrl}/SignDesign`, design, { params });
  }

  updateSignDesign(design: SignDesign): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/SignDesign/${design.id}`, design);
  }

  deleteSignDesign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/SignDesign/${id}`);
  }




  getMaxOrderThisMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Order/stats/max-order-current-month`);
  }

  getOrdersPerMonth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Order/stats/orders-per-month`);
  }

  getProjectCountsPerOrderThisMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Order/stats/project-counts-per-order`);
  }
}

  export interface Order {
  id: string;
  orderName: string;
  installationAdress: string;
  phoneNumber: string;
  email: string;
  deadline: string;     
  startDate?: string;
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


  