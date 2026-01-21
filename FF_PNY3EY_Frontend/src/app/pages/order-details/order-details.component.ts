import { Component } from '@angular/core';
import { OrderService, Project } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';

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

  createProject(form: NgForm): void {
    if (form.invalid || !this.orderId) return;

    // Megjegyzés: A service hívásnál megtartottam a paramétereket, ahogy írtad
    this.orderService.createProject(this.newProject, this.newProject.packageDemand).subscribe({
      next: () => {
        this.loadProjects();
        this.hideModal('newProjectModal');
        // A form resetelését rábízhatjuk az újranyitáskori initEmptyProject-re, 
        // de ha itt akarod: form.resetForm();
      },
      error: (err) => console.error('Hiba létrehozáskor:', err)
    });
  }

  openNewProjectModal(): void {
    this.newProject = this.initEmptyProject(); 
    this.showModal('newProjectModal');
  }

  openEditModal(project: Project): void {
    this.selectedProject = { ...project };
    this.showModal('projectModal');
  }

  confirmDelete(project: Project): void {
    if (confirm(`Biztosan törölni szeretnéd a(z) "${project.projectName}" projektet?`)) {
      if (project.id) {
        this.orderService.deleteProject(project.id).subscribe(() => this.loadProjects());
      }
    }
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

  private showModal(modalId: string): void {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      let modal = Modal.getInstance(modalEl);
      if (!modal) {
        modal = new Modal(modalEl);
      }
      modal.show();
    }
  }

  private hideModal(modalId: string): void {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modal = Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  

}
  