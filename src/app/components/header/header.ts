
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  @Input() activeSection = 'start';
  @Input() isDarkMode = false;
  @Output() toggleDark = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  isMenuOpen = false;
  isScrolled = false;
  scrollY = 20;

  constructor(private translate: TranslateService) {
  }

  switchLanguage() {
      const currentLang = this.translate.currentLang;
      const nextLang = currentLang === 'es' ? 'en' : 'es';

      this.translate.use(nextLang);
    }

  get currentLangText(): string {
      return this.translate.currentLang === 'es' ? 'ES' : 'EN';
    }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > this.scrollY;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  onLinkClick(sectionId: string) {
    this.activeSection = sectionId;
    this.isMenuOpen = false;
    this.navigate.emit(sectionId);
  }
}
