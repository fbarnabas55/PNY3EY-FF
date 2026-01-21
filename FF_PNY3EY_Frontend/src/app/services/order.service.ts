import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {}

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
