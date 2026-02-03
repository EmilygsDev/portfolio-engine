
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { Phase } from '../../models/project-model';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectListComponent implements OnInit {
  allTechnologies: any[] = [];
  activeProjects: any[] = [];
  activePhase = 'all';

  phases: Phase[] = [
    { id: 'all', name: 'Overview' },
    { id: 'plan', name: 'Planning' },
    { id: 'design', name: 'Design' },
    { id: 'implementation', name: 'Implementation' },
    { id: 'deployment', name: 'Deployment' },
    { id: 'testing', name: 'Testing' },
    { id: 'maintenance', name: 'Maintenance' }
  ];

  constructor(
    private dataService: DataService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.allTechnologies = this.dataService.getTechnologies();
    this.activeProjects = this.dataService.getProjectsByPhase('all');
  }

  selectPhase(phaseId: string) {
    this.activePhase = phaseId;
    this.activeProjects = this.dataService.getProjectsByPhase(phaseId);
    this.allTechnologies = this.dataService.getTechsForPhase(phaseId);
  }

  selectTech(tech: any) {
    const validIds = this.dataService.getTechsForPhase(this.activePhase).map((t: any) => t.id);

    this.activeProjects = this.dataService.getProjectsByTech(tech.id).filter((p: any) => {
      if (this.activePhase === 'all') return true;
      return p.techIds.some((id: string) => validIds.includes(id));
    });

    this.triggerNeonAnimation(tech);
  }

  private triggerNeonAnimation(tech: any) {
    const origin = document.querySelector(`.icon-wrapper[data-tech="${tech.id}"] img`);
    const targets = document.querySelectorAll(`.badge[data-tech="${tech.id}"]`);

    if (!origin) return;

    targets.forEach((target, index) => {
      this.animateNeonIcon(tech, origin as HTMLElement, target as HTMLElement, index);
    });
  }

  private animateNeonIcon(tech: any, origin: HTMLElement, target: HTMLElement, index: number) {
    const oRect = origin.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    const clone = this.renderer.createElement('img');
    this.renderer.setAttribute(clone, 'src', tech.icon);

    Object.assign(clone.style, {
      position: 'fixed',
      zIndex: '9999',
      top: `${oRect.top}px`,
      left: `${oRect.left}px`,
      width: `${oRect.width}px`,
      filter: `brightness(0) invert(1) drop-shadow(0 0 10px ${tech.color})`,
      transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
      transitionDelay: `${index * 0.05}s`,
      pointerEvents: 'none'
    });

    this.renderer.appendChild(document.body, clone);

    requestAnimationFrame(() => {
      setTimeout(() => {
        clone.style.top = `${tRect.top}px`;
        clone.style.left = `${tRect.left}px`;
        clone.style.width = '16px';
        clone.style.opacity = '0';
        clone.style.transform = 'rotate(360deg)';
      }, 10);
    });

    setTimeout(() => this.renderer.removeChild(document.body, clone), 1000);
  }
}
