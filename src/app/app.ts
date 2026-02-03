
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutMeComponent } from './components/about-me/about-me';
import { StartComponent } from './components/start/start';
import { ContactComponent } from './components/contact/contact';
import { ProjectListComponent } from './components/project-list/project-list';
import { HeaderComponent } from './components/header/header';
import { TranslateModule } from '@ngx-translate/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AboutMeComponent,
    StartComponent,
    ContactComponent,
    ProjectListComponent,
    HeaderComponent,
    TranslateModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentYear: number = new Date().getFullYear();
  activeSection = 'start';
  isDarkMode = false;
  isSent = false;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly connectionDistance = 150;
  private readonly SCROLL_OFFSET = 70;
  private readonly HEADER_THRESHOLD = 80;
  private readonly VELOCITY_FACTOR = 0.4;
  private readonly START_SECTION_THRESHOLD = 50;

  ngAfterViewInit() {
    this.setupScrollSpy();
  }

  private setupScrollSpy() {

    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.activeSection = sectionId;
          localStorage.setItem('activeSection', sectionId);
        }
      }
    }, options);
      const sections = document.querySelectorAll('section[id]');
      for (const section of sections) {
        observer.observe(section);
      }
  }

  private initTechBackground() {
    this.canvas = document.getElementById('tech-canvas') as HTMLCanvasElement;
    if (this.canvas) {
      const context = this.canvas.getContext('2d');
      if (context) {
        this.ctx = context;
        this.handleResize();
        this.createNetworkNodes();
        this.animateNetwork();
      }
    }
  }

  private createNetworkNodes() {
    this.particles = [];
    for (let i = 0; i < this.HEADER_THRESHOLD; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.VELOCITY_FACTOR,
        vy: (Math.random() - 0.5) * this.VELOCITY_FACTOR
      });
    }
  }

  private animateNetwork() {
    if (!this.ctx || !this.canvas) {
      return;
      }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const [i, p] of this.particles.entries()) {
      this.updateParticlePosition(p);
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        this.drawConnection(p, p2, dist);
      }
    }
    requestAnimationFrame(() => this.animateNetwork());
  }
  private updateParticlePosition(p: Particle) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > this.canvas.width) {
      p.vx *= -1;
    }
    if (p.y < 0 || p.y > this.canvas.height) {
      p.vy *= -1;
    }
  }

  private drawConnection(p1: Particle, p2: Particle, dist: number) {
    if (this.ctx && dist < this.connectionDistance) {
      this.ctx.beginPath();
      let color = '0, 122, 255';
                  if (this.isDarkMode) {
                    color = '77, 163, 255';
                  }
      this.ctx.strokeStyle = `rgba(${color}, ${1 - dist / this.connectionDistance})`;
      this.ctx.lineWidth = 0.6;
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
  }

  @HostListener('window:resize')
  handleResize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  windowScrollY = 0;

  @HostListener('window:scroll', [])

  onWindowScroll() {
    this.windowScrollY = window.scrollY;


    if (this.windowScrollY < this.START_SECTION_THRESHOLD) {
      this.activeSection = 'start';
    }
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      localStorage.setItem('activeSection', sectionId);
      this.activeSection = sectionId;

      window.scrollTo({
        top: element.offsetTop -this.SCROLL_OFFSET,
        behavior: 'smooth'
      });


      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }


  ngOnInit() {
    const savedSection = localStorage.getItem('activeSection');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
    if (savedSection) {
          this.activeSection = savedSection;

          setTimeout(() => this.scrollTo(savedSection), 100);
        }
  }

}
