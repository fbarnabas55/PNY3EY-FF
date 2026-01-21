import { Component } from '@angular/core';
import { OrderService, Project, SignDesign } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
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

  signDesigns: SignDesign[] = [];
  selectedDesign: SignDesign | null = null;
  newDesign: SignDesign = this.initEmptyDesign();

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
    this.loadDesigns();
  }

  loadOrder(): void {
    if (!this.orderId) return;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order) => this.orderName = order.orderName,
      error: (err) => console.error('Hiba a rendelés betöltésekor:', err)
    });
  }
  loadDesigns(): void {
    if (!this.orderId) return;
    this.orderService.getSignDesigns(this.orderId).subscribe({
      next: (data) => this.signDesigns = data,
      error: (err) => console.error('Hiba a designok betöltésekor:', err)
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

  createDesign(): void {
    if (!this.newDesign.description || this.newDesign.width <= 0 || this.newDesign.height <= 0) {
      alert('Hiba: Kérlek add meg a leírást és a méreteket!');
      return;
    }

    this.orderService.createSignDesign(this.newDesign).subscribe({
      next: () => {
        this.loadDesigns();
        this.closeModalById('newDesignModal');
        this.newDesign = this.initEmptyDesign();
      },
      error: (err) => console.error('Hiba design létrehozáskor:', err)
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

  openNewDesignModal(): void {
    this.newDesign = this.initEmptyDesign();
    this.showModal('newDesignModal');
  }

  openEditDesignModal(design: SignDesign): void {
    this.selectedDesign = { ...design };
    this.showModal('editDesignModal');
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

  private initEmptyDesign(): SignDesign {
    return {
      orderId: this.orderId || '',
      description: '',
      fixing: '',
      decor: '',
      width: 0,
      height: 0,
      material: 'Steel',
      brightness: 'Medium',
      lightings: 'LED'
    };
  }

  private showModal(modalId: string): void {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      let modal = bootstrap.Modal.getInstance(modalEl);
      if (!modal) {
        modal = new bootstrap.Modal(modalEl);
      }
      modal.show();
    }
  }
}
  