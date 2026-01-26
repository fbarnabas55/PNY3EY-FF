import { Project } from "./project";

export class Order {
  id: string="";
  orderName: string="";
  installationAdress: string="";
  phoneNumber: string="";
  email: string="";
  deadline: string="";
  startDate?: string="";
  projects?: Project[]= [];
  designs?: any[]= [];
  }
