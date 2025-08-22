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
  styleUrl: './navbar.scss',
})
export class Navbar implements AfterViewInit, OnDestroy {

  @ViewChild('navbar', { static: false }) navbarRef!: ElementRef;

  // État du menu mobile
  isMenuOpen = false;
  lastScroll = 0;
  private isMobile = false;
  private resizeTimeout: any;
  private scrollHandler: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Bind du scroll handler pour le cleanup
    this.scrollHandler = this.createScrollHandler();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Cacher immédiatement la navbar
      this.hideElementsBeforeAnimation();

      // ✅ NOUVEAU : Initialiser l'état des liens du menu mobile
      this.initializeMobileMenuState();

      this.checkMobileView();
      this.setupScrollBehavior();
      this.setupKeyboardListeners();

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.animateNavbar();
        });
      }, 50);
    }
  }

  // ✅ NOUVELLE MÉTHODE : Initialiser l'état du menu mobile
  private initializeMobileMenuState(): void {
    gsap.set('.mobile-nav-link', {
      x: 30,
      opacity: 0
    });

    gsap.set('.mobile-menu-overlay', {
      display: 'none',
      opacity: 0
    });

    gsap.set('.mobile-nav', {
      right: '-100%'
    });
  }

  ngOnDestroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    if (isPlatformBrowser(this.platformId)) {
      // ✅ Cleanup de tous les event listeners
      document.removeEventListener('keydown', this.handleKeydown.bind(this));
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  // ✅ NOUVELLE MÉTHODE : Cacher les éléments avant animation
  private hideElementsBeforeAnimation(): void {
    gsap.set('.navbar', {
      y: -80,
      opacity: 0
    });

    gsap.set('.desktop-nav .mat-mdc-button', {
      y: -20,
      opacity: 0
    });
  }

  // ✅ MÉTHODE CORRIGÉE : Animation d'entrée de la navbar
  private animateNavbar(): void {
    const timeline = gsap.timeline();

    timeline
      .to('.navbar', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.desktop-nav .mat-mdc-button', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.5'); // Commence avant la fin de la navbar
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

  // ✅ ANIMATION D'OUVERTURE CORRIGÉE
  private animateMobileMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;

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
      // ✅ CORRECTION : Animer vers l'état final (pas from)
      .to('.mobile-nav-link', {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.2');
  }

  // ✅ ANIMATION DE FERMETURE AVEC RESET
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
          // ✅ NOUVEAU : Remettre les liens dans leur état initial
          gsap.set('.mobile-nav-link', {
            x: 30,
            opacity: 0
          });
        }
      }, '-=0.2');
  }

  // ✅ MÉTHODE TOGGLE AMÉLIORÉE
  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();

    if (this.isMenuOpen) {
      this.animateMobileMenu();
    } else {
      this.animateMobileMenuClose();
    }
  }

  // Gestion du scroll du body
  private updateBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  // ✅ CRÉATION DU SCROLL HANDLER
  private createScrollHandler(): () => void {
    let ticking = false;

    const updateNavbar = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (!navbar) return;

      const currentScroll = window.pageYOffset;
      const scrollDifference = Math.abs(currentScroll - this.lastScroll);

      // Seuil minimum pour déclencher l'animation
      if (scrollDifference < 5) {
        ticking = false;
        return;
      }

      if (currentScroll > 100 && !this.isMenuOpen) {
        if (currentScroll > this.lastScroll) {
          // Scroll vers le bas - cacher avec animation douce
          gsap.to(navbar, {
            y: -80,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          // Scroll vers le haut - montrer avec animation douce
          gsap.to(navbar, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      } else {
        // En haut de page - toujours visible
        gsap.to(navbar, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      this.lastScroll = currentScroll;
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };
  }

  // ✅ COMPORTEMENT DE SCROLL OPTIMISÉ
  private setupScrollBehavior(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // ✅ Utilisation du handler créé avec passive: true
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  // Gestion des événements clavier
  private setupKeyboardListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
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

  // ✅ GESTION DU REDIMENSIONNEMENT CORRIGÉE
  @HostListener('window:resize')
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

  // ✅ MÉTHODES PUBLIQUES POUR L'API DU COMPOSANT
  public closeMenu(): void {
    this.closeMobileMenu();
  }

  public openMenu(): void {
    this.openMobileMenu();
  }

  public toggleMenu(): void {
    this.toggleMobileMenu();
  }

  public get menuOpen(): boolean {
    return this.isMenuOpen;
  }

  public get isMobileView(): boolean {
    return this.isMobile;
  }

  // ✅ MÉTHODE POUR NAVIGUER VERS UNE SECTION
  public navigateToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      // Fermer le menu mobile si ouvert
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      }

      // Scroll vers la section avec un délai pour laisser le menu se fermer
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, this.isMenuOpen ? 300 : 0);
    }
  }

  // ✅ MÉTHODE POUR FORCER LA RÉINITIALISATION DES ANIMATIONS
  public resetAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.hideElementsBeforeAnimation();

    setTimeout(() => {
      this.animateNavbar();
    }, 50);
  }
}