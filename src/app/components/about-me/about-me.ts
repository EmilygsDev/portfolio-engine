
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type StarSize = 'small' | 'medium' | 'large';

export interface Milestone {
  title: string;
  subtitle: string;
  description: string;
}

export interface Star {
  id: string;
  x: string;
  y: string;
  size: StarSize;
  info?: Milestone;
}

const INITIAL_BIO: Milestone = {
  title: 'INTERACTIVE STAR MAP',
  subtitle: 'ENGINEER PROFILE',
  description: 'DNA OF THE MIND: KNOWS HOW TO USE THE PHYSICAL LAWS OF THE ELECTRON (ATOMS) AND ITS ASSOCIATED SYSTEMS'
};

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent {
  private readonly _activeInfo = signal<Milestone>(INITIAL_BIO);
  readonly activeInfo = computed(() => this._activeInfo());

  readonly skills = [
    { name: 'USER INTERFACE PERCENTAGE', level: '50%' },
    { name: 'CORE LOGIC PERCENTAGE', level: '80%' },
    { name: 'INFRASTRUCTURE PERCENTAGE', level: '30%' },
    { name: 'DATA ARCH PERCENTAGE', level: '60%' }
  ] as const;

  readonly stars: Star[] = [
    { id: 'epsilon', x: '42%', y: '12%', size: 'medium', info: { title: ' Initial Scalability Star', subtitle: 'Avoiding technical debt in systems that start small and must scale rapidly', description: 'I design solutions thinking about how systems will grow, ensuring that future changes do not break what has already been implemented.' }},
    { id: 'delta',   x: '46%', y: '32%', size: 'small', info: { title: ' Integration Star', subtitle: 'Juniors often write isolated code that complicates integrations.', description: 'I create modular components that integrate easily with existing systems, reducing friction with previous projects.' }},
    { id: 'gamma',   x: '56%', y: '52%', size: 'medium', info: { title: ' Error Prevention Star', subtitle: 'Companies lose time and money fixing bugs that could have been avoided.', description: 'I anticipate potential logical failures and edge cases before coding, minimizing production errors.' }},
    { id: 'eta',     x: '71%', y: '47%', size: 'small', info: { title: ' Process Adaptation Star', subtitle: 'Juniors who impose their own methods create friction and resistance in consolidated teams.', description: 'I learn and adapt my solutions to existing workflows, maintaining consistency with the infrastructure and methodologies.' } },
    { id: 'beta',    x: '86%', y: '42%', size: 'medium',info: { title: ' Repetitive Task Automation Star', subtitle: 'Slow and repetitive processes that decrease productivity.', description: 'I identify manual tasks and build small tools to automate them, freeing up the  time for critical work.' } },
    { id: 'nu',      x: '91%', y: '22%', size: 'small', info: { title: ' Safe Experimentation Star', subtitle: 'Fear of juniors breaking production; your approach reduces risk and increases confidence.', description: 'I test new solutions in controlled environments, learning quickly without affecting production systems.' } },
    { id: 'theta',   x: '36%', y: '67%', size: 'small', info: { title: ' Reusability Star', subtitle: 'Code duplication, loss of time, and inconsistency across projects.', description: 'My scripts and libraries are designed to be reusable, avoiding duplicated efforts and accelerating new developments.' } },
    { id: 'zeta',    x: '21%', y: '47%', size: 'medium', info: { title: ' Technical Visibility Star', subtitle: 'Lack of transparency in projects leads to misunderstandings and rework.', description: 'Documenting and commenting on my decisions allows others to quickly understand my logic and adopt my solutions.' } },
    { id: 'spica',   x: '26%', y: '87%', size: 'large',  info: { title: ' Architecture of Clarity Star', subtitle: 'Time lost when contextualizing projects and repetition of previous learning.', description: 'I create internal tools and clear documentation as if they were for a novice user, which saves time and avoids repeating the same learning twice.' }}
  ];

  selectMilestone(star: Star): void {
    this._activeInfo.set(star.info ?? INITIAL_BIO);
  }

  trackById(_: number, star: Star): string {
    return star.id;
  }
}
