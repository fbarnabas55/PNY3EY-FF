import { Component } from '@angular/core';
import { OrderService} from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Project } from '../../models/project';
import { Design } from '../../models/design';
@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.sass'
})
export class OrderDetailsComponent {
  orderId: string | null = null;

  selectedProject: Project | null = null;
  newProject: Project; 

  selectedDesign: Design | null = null;
  newDesign: Design;

  constructor(private route: ActivatedRoute, public orderService: OrderService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    
    this.newProject = this.initEmptyProject();
    this.newDesign = this.initEmptyDesign();

    if (this.orderId) {
      this.orderService.loadOrderById(this.orderId);
      this.orderService.loadProjects(this.orderId);
      this.orderService.loadDesigns(this.orderId);
    }
  }


  createProject(): void {
    if (!this.isProjectValid(this.newProject)) {
      return;
    }

    this.orderService.createProject(this.newProject, this.newProject.packageDemand, () => {
      this.closeModalById('newProjectModal');
      this.newProject = this.initEmptyProject();
    });
  }

  saveProject(): void {
    if (!this.selectedProject) return;

    if (!this.isProjectValid(this.selectedProject)) {
       return;
    }

    this.orderService.updateProject(this.selectedProject, this.selectedProject.packageDemand, () => {
      this.closeModalById('projectModal');
      this.selectedProject = null;
    });
  }

  deleteProject(project: Project): void {
    if (confirm(`Biztosan törlöd a(z) "${project.projectName}" projektet?`)) {
      if (project.id) {
        this.orderService.deleteProject(project.id);
      }
    }
  }




  createDesign(): void {
    if (!this.isDesignValid(this.newDesign)) {
      return;
    }

    this.orderService.createDesign(this.newDesign, () => {
       this.closeModalById('newDesignModal');
       this.newDesign = this.initEmptyDesign();
    });
  }

  saveDesign(): void {
    if (!this.selectedDesign) return;

    if (!this.isDesignValid(this.selectedDesign)) {
       return;
    }

    this.orderService.updateDesign(this.selectedDesign, () => {
       this.closeModalById('editDesignModal');
       this.selectedDesign = null;
    });
  }

  deleteDesign(design: Design): void {
    if (confirm(`Biztosan törlöd a "${design.description}" designt?`)) {
      if (design.id) {
        this.orderService.deleteDesign(design.id);
      }
    }
  }


  private isProjectValid(p: Project): boolean {
    if (!p.projectName || p.projectName.trim() === '') {
      alert('Hiba: A projekt neve kötelező!');
      return false;
    }
    if (!p.description || p.description.trim() === '') {
      alert('Hiba: A leírás megadása kötelező!');
      return false;
    }
    if (!p.projectManager || p.projectManager.trim() === '') {
      alert('Hiba: A projektmenedzser megadása kötelező!');
      return false;
    }
    if (p.price <= 0) {
      alert('Hiba: Az árnak nagyobbnak kell lennie nullánál!');
      return false;
    }
    return true;
  }

  private isDesignValid(d: Design): boolean {
    if (!d.description || d.description.trim() === '') {
      alert('Hiba: A leírás/név megadása kötelező!');
      return false;
    }
    if (!d.decor || d.decor.trim() === '') {
      alert('Hiba: A dekor megadása kötelező!');
      return false;
    }
    if (!d.fixing || d.fixing.trim() === '') {
      alert('Hiba: A rögzítés módjának megadása kötelező!');
      return false;
    }
    if (d.width <= 0) {
      alert('Hiba: A szélességnek nagyobbnak kell lennie nullánál!');
      return false;
    }
    if (d.height <= 0) {
      alert('Hiba: A magasságnak nagyobbnak kell lennie nullánál!');
      return false;
    }
    return true;
  }


  openEditModal(project: Project): void {
    this.selectedProject = { ...project };
    this.showModal('projectModal');
  }

  openNewDesignModal(): void {
    this.newDesign = this.initEmptyDesign();
    this.showModal('newDesignModal');
  }

  openEditDesignModal(design: Design): void {
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
      this.cleanupBackdrop();
    }
  }


  private showModal(modalId: string): void {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  private cleanupBackdrop(): void {
    setTimeout(() => {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    }, 150);
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

  private initEmptyDesign(): Design {
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
}
  