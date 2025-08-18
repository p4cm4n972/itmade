import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  AfterViewInit,
  HostListener,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements AfterViewInit, OnDestroy {
  
  @ViewChild('navbar', { static: false }) navbarRef!: ElementRef;
  
  // État du menu mobile
  isMenuOpen = false;
  lastScroll = 0;
  private isMobile = false;
  private resizeTimeout: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobileView();
      this.animateNavbar();
      this.setupScrollBehavior();
      this.setupKeyboardListeners();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  // Gestion du menu mobile
  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
    this.animateMobileMenu();
  }

  closeMobileMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
      this.animateMobileMenuClose();
    }
  }

  openMobileMenu(): void {
    if (!this.isMenuOpen) {
      this.isMenuOpen = true;
      this.updateBodyScroll();
      this.animateMobileMenu();
    }
  }

  // Animation d'entrée de la navbar
  private animateNavbar(): void {
    gsap.fromTo('.navbar', 
      {
        y: -80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Animation des liens desktop
    gsap.from('.desktop-nav .mat-mdc-button', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  // Animation du menu mobile
  private animateMobileMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isMenuOpen) {
      // Animation d'ouverture
      gsap.timeline()
        .set('.mobile-menu-overlay', { display: 'block' })
        .to('.mobile-menu-overlay', {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        .to('.mobile-nav', {
          right: 0,
          duration: 0.4,
          ease: 'power3.out'
        }, '-=0.1')
        .from('.mobile-nav-link', {
          x: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out'
        }, '-=0.2');
    }
  }

  private animateMobileMenuClose(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.timeline()
      .to('.mobile-nav-link', {
        x: 30,
        opacity: 0,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power3.in'
      })
      .to('.mobile-nav', {
        right: '-100%',
        duration: 0.3,
        ease: 'power3.in'
      }, '-=0.1')
      .to('.mobile-menu-overlay', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set('.mobile-menu-overlay', { display: 'none' });
        }
      }, '-=0.2');
  }

  // Gestion du scroll du body
  private updateBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Éviter le shift du scrollbar
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  // Comportement de scroll de la navbar
  private setupScrollBehavior(): void {
    let ticking = false;

    const updateNavbar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (!navbar) return;

      const currentScroll = window.pageYOffset;
      const scrollDifference = Math.abs(currentScroll - this.lastScroll);

      // Seuil minimum pour déclencher l'animation
      if (scrollDifference < 5) return;

      if (currentScroll > 100 && !this.isMenuOpen) {
        if (currentScroll > this.lastScroll) {
          // Scroll vers le bas - cacher
          navbar.classList.add('navbar-hidden');
          navbar.classList.remove('navbar-visible');
        } else {
          // Scroll vers le haut - montrer
          navbar.classList.add('navbar-visible');
          navbar.classList.remove('navbar-hidden');
        }
      } else {
        // En haut de page - toujours visible
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
      }

      this.lastScroll = currentScroll;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Gestion des événements clavier
  private setupKeyboardListeners(): void {
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Fermer le menu avec Escape
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Navigation au clavier dans le menu mobile
    if (this.isMenuOpen && (event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      this.handleMenuNavigation(event);
    }
  }

  private handleMenuNavigation(event: KeyboardEvent): void {
    const menuLinks = document.querySelectorAll('.mobile-nav-link');
    const currentFocus = document.activeElement;
    let currentIndex = Array.from(menuLinks).indexOf(currentFocus as Element);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % menuLinks.length;
      (menuLinks[currentIndex] as HTMLElement).focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      currentIndex = currentIndex <= 0 ? menuLinks.length - 1 : currentIndex - 1;
      (menuLinks[currentIndex] as HTMLElement).focus();
    }
  }

  // Détection mobile
  private checkMobileView(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isMobile = window.innerWidth <= 768;
  }

  // Gestion du redimensionnement
  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Debounce du resize
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      const wasMobile = this.isMobile;
      this.checkMobileView();

      // Si on passe de mobile à desktop, fermer le menu
      if (wasMobile && !this.isMobile && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250);
  }

  // Gestion du scroll (version optimisée)
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Le comportement de scroll est géré dans setupScrollBehavior()
  }

  // Méthode publique pour fermer le menu depuis l'extérieur
  public closeMenu(): void {
    this.closeMobileMenu();
  }

  // Méthode publique pour vérifier si le menu est ouvert
  public get menuOpen(): boolean {
    return this.isMenuOpen;
  }
}