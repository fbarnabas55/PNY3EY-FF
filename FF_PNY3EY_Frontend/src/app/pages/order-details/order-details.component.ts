import { Component } from '@angular/core';
import { OrderService, Project } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
declare var bootstrap: any;

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

  createProject(): void {
    if (!this.newProject.projectName || !this.newProject.projectManager || this.newProject.price <= 0) {
      alert('Hiba: Kérlek töltsd ki a kötelező mezőket (Név, Menedzser, Ár)!');
      return;
    }

    this.orderService.createProject(this.newProject, this.newProject.packageDemand).subscribe({
      next: () => {
        this.loadProjects();
        this.closeModalById('newProjectModal'); 
        this.newProject = this.initEmptyProject();
      },
      error: (err) => console.error('Hiba történt:', err)
    });
  }

  saveProject(): void {
    if (!this.selectedProject) return;

    if (!this.selectedProject.projectName || !this.selectedProject.projectManager || this.selectedProject.price <= 0) {
      alert('Hiba: Kérlek töltsd ki a kötelező mezőket!');
      return;
    }

    this.orderService.updateProject(this.selectedProject, this.selectedProject.packageDemand).subscribe({
      next: () => {
        this.loadProjects();
        this.closeModalById('projectModal');
        this.selectedProject = null;
      },
      error: (err) => console.error('Hiba a mentéskor:', err)
    });
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

  openNewProjectModal(): void {
    this.newProject = this.initEmptyProject(); 
    this.showModal('newProjectModal');
  }

  closeModalById(modalId: string): void {
    const element = document.getElementById(modalId);
    if (element) {

      const modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.hide();

      setTimeout(() => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
        
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        document.body.style.removeProperty('overflow');
      }, 150);
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
  