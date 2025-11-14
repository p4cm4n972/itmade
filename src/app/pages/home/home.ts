import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Entreprises } from "../../components/entreprises/entreprises";
import { Consultants } from "../../components/consultants/consultants";
import { Expertises } from "../../components/expertises/expertises";
import { Approche } from "../../components/approche/approche";
import { CtaFinal } from "../../components/cta-final/cta-final";
import { Contact } from "../../components/contact/contact";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, Entreprises, Consultants, Expertises, Approche, CtaFinal, Contact, MatIconModule, MatButtonModule]
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('hero', { static: true }) hero!: ElementRef;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('floatingCard', { static: false }) floatingCard!: ElementRef;
  
  private scrollTriggers: ScrollTrigger[] = [];
  private animations: gsap.core.Animation[] = [];
  private isMobile = false;

  // Technologies data
  technologies = [
    {
      name: 'Angular',
      logo: 'assets/logos/angular.webp',
      color: '#DD0031'
    },
    {
      name: 'Node.js',
      logo: 'assets/logos/nodejs.svg',
      color: '#339933'
    },
    {
      name: 'Flutter',
      logo: 'assets/logos/flutter.svg',
      color: '#02569B'
    },
    {
      name: 'JavaScript',
      logo: 'assets/logos/javascript.webp',
      color: '#F7DF1E'
    },
    {
      name: 'HTML5',
      logo: 'assets/logos/html.webp',
      color: '#E54F26'
    },
    {
      name: 'CSS3',
      logo: 'assets/logos/css.webp',
      color: '#1572B6'
    },
    {
      name: 'Dart',
      logo: 'assets/logos/dart.webp',
      color: '#0175C2'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    
    // Détection mobile
    this.isMobile = window.innerWidth <= 768;
    
    // IMPORTANT: Cacher immédiatement les éléments avant animation
    this.hideElementsBeforeAnimation();
    
    // Utilisation de setTimeout avec un délai plus court pour de meilleures performances
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.initializeAnimations();
        this.initTechBubblesAnimations();
        this.setupResponsiveListeners();
      });
    }, 50);
  }

  private hideElementsBeforeAnimation(): void {
    // Cacher immédiatement tous les éléments qui vont être animés
    gsap.set([
      '.hero-content h1',
      '.hero-content p', 
      '.cta-button',
      '.floating-card',
      '.tech-bubble'
    ], {
      opacity: 0,
      visibility: 'visible' // S'assurer qu'ils restent dans le layout
    });
  }

  ngOnDestroy(): void {
    // Nettoyage des animations et ScrollTriggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.animations.forEach(animation => animation.kill());
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Nettoyer les event listeners - protégé contre SSR
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
  }

  private setupResponsiveListeners(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Si le statut mobile change, re-initialiser les animations
    if (wasMobile !== this.isMobile) {
      this.reinitializeAnimations();
    }
  }

  private reinitializeAnimations(): void {
    // Nettoyer les animations existantes
    this.animations.forEach(animation => animation.kill());
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.animations = [];
    this.scrollTriggers = [];
    
    // Cacher à nouveau les éléments
    this.hideElementsBeforeAnimation();
    
    // Re-initialiser
    setTimeout(() => {
      this.initializeAnimations();
      this.initTechBubblesAnimations();
    }, 100);
  }

  private initializeAnimations(): void {
    this.animateHero();
    this.animateLayeredPinning();
    this.animateOnScroll('.hero-fade-in', { y: this.isMobile ? 30 : 50 });
    this.animateOnScroll('.hero-slide-in-right', { x: this.isMobile ? 50 : 100 });
    this.animateOnScroll('.fade-in-up', { y: this.isMobile ? 20 : 30 });
    this.animateOnScroll('.fade-in-left', { x: this.isMobile ? -30 : -50 });
  }

  private animateHero(): void {
    const heroTimeline = gsap.timeline();
    
    // Animation adaptée selon la taille d'écran
    const animationConfig = this.isMobile ? {
      h1: { duration: 1, y: 40, stagger: 0.1 },
      p: { duration: 0.8, y: 30 },
      button: { duration: 0.6, y: 20, scale: 0.95 },
      card: { duration: 1, x: 50, rotation: 2 }
    } : {
      h1: { duration: 1.2, y: 60, stagger: 0.2 },
      p: { duration: 1, y: 40 },
      button: { duration: 0.8, y: 30, scale: 0.9 },
      card: { duration: 1.2, x: 120, rotation: 5 }
    };

    heroTimeline
      .to('.hero-content h1', {
        ...animationConfig.h1,
        opacity: 1,
        y: 0,
        ease: 'power3.out'
      })
      .to('.hero-content p', {
        ...animationConfig.p,
        opacity: 1,
        y: 0,
        ease: 'power3.out'
      }, '-=0.6')
      .to('.cta-button', {
        ...animationConfig.button,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .to('.floating-card', {
        ...animationConfig.card,
        opacity: 1,
        x: 0,
        rotation: 0,
        ease: 'power3.out'
      }, '-=0.8');

    // Animation flottante continue - réduite sur mobile
    const floatingAnimation = gsap.to('.floating-card', {
      duration: this.isMobile ? 3 : 4,
      y: this.isMobile ? -8 : -15,
      rotation: this.isMobile ? 1 : 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1 // Attendre que l'animation d'entrée soit finie
    });

    this.animations.push(heroTimeline, floatingAnimation);
  }

  private animateLayeredPinning(): void {
    // Désactiver le pinning sur mobile pour de meilleures performances
    if (this.isMobile) {
      return;
    }

    const pinOptions = {
      start: 'top top',
      pin: true,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1
    };

    // Animation des panneaux avec épinglage
    gsap.utils.toArray<HTMLElement>('[class$="-panel"]').forEach((panel, i) => {
      if (panel.classList.contains('no-pin')) return;
      
      const trigger = ScrollTrigger.create({
        trigger: panel,
        ...pinOptions
      });
      
      this.scrollTriggers.push(trigger);
    });

    // Animation du footer
    const footerTrigger = ScrollTrigger.create({
      trigger: '.footer',
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.from('.footer', {
          opacity: 0,
          y: 60,
          duration: 1.5,
          ease: 'power3.out'
        });
      }
    });

    this.scrollTriggers.push(footerTrigger);
  }

  private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to(el, {
            ...animation,
            opacity: 1,
            x: 0,
            y: 0,
            duration: this.isMobile ? 0.8 : 1.2,
            ease: 'power3.out'
          });
        }
      });
      
      this.scrollTriggers.push(trigger);
    });
  }

  // Méthodes utilitaires pour les interactions
  public onCTAClick(): void {
    // Animation du bouton au clic
    gsap.to('.cta-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    // Scroll vers les services
    this.scrollToSection('services');
  }

  public scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: this.isMobile ? 1 : 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.out'
      });
    }
  }

  // Méthode pour gérer le clic sur une technologie
  public onTechBubbleClick(tech: any): void {
    console.log(`Technologie sélectionnée: ${tech.name}`);
    
    // Animation de feedback
    const bubble = document.querySelector(`[data-tech="${tech.name}"]`);
    if (bubble) {
      gsap.to(bubble, {
        scale: this.isMobile ? 1.1 : 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
    }
  }

  private initTechBubblesAnimations(): void {
    const section = this.heroSection?.nativeElement;
    const floatingCard = this.floatingCard?.nativeElement;
    
    if (!section || !floatingCard) return;

    // Configuration responsive pour les animations
    const mobileConfig = {
      card: { y: 50, scale: 0.9, duration: 1 },
      bubbles: { y: 50, scale: 0.8, duration: 1, stagger: 0.1 },
      floating: { y: 10, duration: 2 }
    };

    const desktopConfig = {
      card: { y: 100, scale: 0.8, duration: 1.5 },
      bubbles: { y: 100, scale: 0, duration: 1.2, stagger: 0.15 },
      floating: { y: 20, duration: 3 }
    };

    const config = this.isMobile ? mobileConfig : desktopConfig;

    // Animation d'entrée de la floating card
    gsap.set(floatingCard, {
      opacity: 0,
      y: config.card.y,
      rotationX: this.isMobile ? 5 : 15,
      rotationY: this.isMobile ? 5 : 15,
      scale: config.card.scale
    });

    gsap.to(floatingCard, {
      opacity: 1,
      y: 0,
      rotationX: this.isMobile ? 2 : 5,
      rotationY: this.isMobile ? -2 : -5,
      scale: 1,
      duration: config.card.duration,
      ease: 'power2.out',
      delay: 0.5
    });

    // Animation des éléments texte dans la card
    const cardElements = floatingCard.querySelectorAll('h3, p');
    gsap.set(cardElements, {
      opacity: 0,
      y: this.isMobile ? 20 : 30
    });

    gsap.to(cardElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: this.isMobile ? 0.1 : 0.2,
      ease: 'power2.out',
      delay: 1
    });

    // Animation d'apparition des bulles technologiques
    const bubbles = section.querySelectorAll('.tech-bubble');
    
    // Sur mobile, afficher moins de bulles pour les performances
    const visibleBubbles: Element[] = this.isMobile ? 
      Array.from(bubbles).slice(0, 4) as Element[] : 
      Array.from(bubbles) as Element[];

    gsap.set(visibleBubbles, {
      opacity: 0,
      scale: config.bubbles.scale,
      y: config.bubbles.y,
      rotationX: this.isMobile ? 90 : 180,
      rotationY: this.isMobile ? 90 : 180
    });

    gsap.to(visibleBubbles, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: config.bubbles.duration,
      stagger: config.bubbles.stagger,
      ease: 'back.out(1.7)',
      delay: 1.5
    });

    // Animation de flottement continu pour les bulles - simplifiée sur mobile
    if (!this.isMobile) {
      this.setupDesktopBubbleAnimations(visibleBubbles, section);
    } else {
      this.setupMobileBubbleAnimations(visibleBubbles);
    }

    // Animation hover de la floating card
    this.setupCardHover(floatingCard, visibleBubbles);

    // Interaction individuelle des bulles
    this.setupBubbleInteractions(visibleBubbles);
  }

  private setupDesktopBubbleAnimations(bubbles: Element[], section: HTMLElement): void {
    // Animation de flottement continu pour les bulles
    bubbles.forEach((bubble: Element, index: number) => {
      const bubbleElement = bubble as HTMLElement;
      
      gsap.to(bubbleElement, {
        y: '+=20',
        rotation: '+=5',
        duration: 3 + (index * 0.5),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.2
      });

      // Rotation 3D subtile
      gsap.to(bubbleElement, {
        rotationY: 360,
        rotationX: 180,
        duration: 12 + (index * 2),
        ease: 'none',
        repeat: -1,
        delay: index * 0.5
      });
    });

    // Effet parallaxe au scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: () => {
        gsap.to(bubbles, {
          y: '-=100',
          ease: 'none'
        });
      }
    });

    this.scrollTriggers.push(parallaxTrigger);

    // Animation de respiration pour quelques bulles spécifiques
    const breathingBubbles = Array.from(bubbles).filter((_, index) => index % 3 === 0);
    breathingBubbles.forEach((bubble: any, index: number) => {
      gsap.to(bubble, {
        scale: 1.05,
        opacity: 0.9,
        duration: 2 + index,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.7
      });
    });
  }

  private setupMobileBubbleAnimations(bubbles: Element[]): void {
    // Animation de flottement simplifiée pour mobile
    bubbles.forEach((bubble: Element, index: number) => {
      const bubbleElement = bubble as HTMLElement;
      
      gsap.to(bubbleElement, {
        y: '+=10',
        duration: 2 + (index * 0.3),
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.1
      });
    });
  }

  private setupCardHover(floatingCard: HTMLElement, bubbles: Element[]): void {
    // Désactiver les hovers complexes sur mobile
    if (this.isMobile) return;

    floatingCard.addEventListener('mouseenter', () => {
      gsap.to(floatingCard, {
        rotationX: 0,
        rotationY: 0,
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Réaction des bulles au hover de la card
      gsap.to(bubbles, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    floatingCard.addEventListener('mouseleave', () => {
      gsap.to(floatingCard, {
        rotationX: 5,
        rotationY: -5,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });

      gsap.to(bubbles, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  private setupBubbleInteractions(bubbles: Element[]): void {
    bubbles.forEach((bubble: Element) => {
      const bubbleElement = bubble as HTMLElement;

      if (!this.isMobile) {
        // Hover pour desktop uniquement
        bubbleElement.addEventListener('mouseenter', () => {
          gsap.to(bubbleElement, {
            scale: 1.2,
            y: -15,
            rotationY: '+=180',
            duration: 0.4,
            ease: 'back.out(1.7)'
          });
        });

        bubbleElement.addEventListener('mouseleave', () => {
          gsap.to(bubbleElement, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      }

      // Click pour tous les devices
      bubbleElement.addEventListener('click', () => {
        gsap.to(bubbleElement, {
          rotationY: '+=360',
          rotationX: this.isMobile ? '+=180' : '+=360',
          scale: this.isMobile ? 1.1 : 1.3,
          duration: this.isMobile ? 0.5 : 0.8,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(bubbleElement, {
              scale: 1,
              duration: 0.3
            });
          }
        });
      });
    });
  }
}