export interface Project {
  id?: string;
  orderId: string;
  projectName: string;
  description: string;
  projectManager: string;
  price: number;
  packageDemand: 'Boxed' | 'Foiled' | 'Stocked';
  }