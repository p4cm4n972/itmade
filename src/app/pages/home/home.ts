import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Services } from "../../components/services/services";
import { Features } from "../../components/features/features";
import { About } from "../../components/about/about";
import { Contact } from "../../components/contact/contact";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, Services, Features, About, Contact, MatIconModule, MatButtonModule, Footer]
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('hero', { static: true }) hero!: ElementRef;
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('floatingCard', { static: false }) floatingCard!: ElementRef;
  
  private scrollTriggers: ScrollTrigger[] = [];
  private animations: gsap.core.Animation[] = [];

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
   /* {
      name: 'NestJS',
      logo: 'assets/logos/nestjs.svg',
      color: '#EA2845'
    },*/
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
    
    // Utilisation de setTimeout avec un délai plus court pour de meilleures performances
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.initializeAnimations();
        this.initTechBubblesAnimations();
      });
    }, 50);
  }

  ngOnDestroy(): void {
    // Nettoyage des animations et ScrollTriggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.animations.forEach(animation => animation.kill());
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  private initializeAnimations(): void {
    this.animateHero();
    this.animateLayeredPinning();
    this.animateOnScroll('.hero-fade-in', { y: 50 });
    this.animateOnScroll('.hero-slide-in-right', { x: 100 });
    this.animateOnScroll('.fade-in-up', { y: 30 });
    this.animateOnScroll('.fade-in-left', { x: -50 });
  }

  private animateHero(): void {
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .from('.hero-content h1', {
        duration: 1.2,
        y: 60,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2
      })
      .from('.hero-content p', {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.cta-button', {
        duration: 0.8,
        y: 30,
        scale: 0.9,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .from('.floating-card', {
        duration: 1.2,
        x: 120,
        opacity: 0,
        rotation: 5,
        ease: 'power3.out'
      }, '-=0.8');

    // Animation flottante continue
    const floatingAnimation = gsap.to('.floating-card', {
      duration: 4,
      y: -15,
      rotation: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    this.animations.push(heroTimeline, floatingAnimation);
  }

  private animateLayeredPinning(): void {
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
        ...pinOptions,
       // onEnter: () => panel.classList.add('is-pinned'),
       // onLeave: () => panel.classList.remove('is-pinned')
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

    // Effet parallaxe pour le hero
  /*  const heroParallaxTrigger = ScrollTrigger.create({
      trigger: '.hero',
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to('.hero-bg', {
          y: self.progress * 100,
          ease: "none"
        });
      }
    });*/

    this.scrollTriggers.push(footerTrigger, /*heroParallaxTrigger*/);
  }

  private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.from(el, {
            ...animation,
            opacity: 0,
            duration: 1.2,
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
  }

  public scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.out'
      });
    }
  }

  // Méthode pour gérer le clic sur une technologie
  public onTechBubbleClick(tech: any): void {
    console.log(`Technologie sélectionnée: ${tech.name}`);
    // Ici vous pouvez ajouter une logique spécifique
    // comme afficher plus d'infos sur la techno
  }

  private initTechBubblesAnimations(): void {
    const section = this.heroSection?.nativeElement;
    const floatingCard = this.floatingCard?.nativeElement;
    
    if (!section || !floatingCard) return;

    // Animation d'entrée de la floating card
    gsap.fromTo(floatingCard,
      {
        opacity: 0,
        y: 100,
        rotationX: 15,
        rotationY: 15,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 5,
        rotationY: -5,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      }
    );

    // Animation des éléments texte dans la card
    const cardElements = floatingCard.querySelectorAll('h1, p, .cta-button');
    gsap.fromTo(cardElements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 1
      }
    );

    // Animation d'apparition des bulles technologiques
    const bubbles = section.querySelectorAll('.tech-bubble');
    gsap.fromTo(bubbles,
      {
        opacity: 0,
        scale: 0,
        y: 100,
        rotationX: 180,
        rotationY: 180
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 1.5
      }
    );

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

    // Animation hover de la floating card
    this.setupCardHover(floatingCard, bubbles);

    // Interaction individuelle des bulles
    this.setupBubbleInteractions(bubbles);

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

  private setupCardHover(floatingCard: HTMLElement, bubbles: NodeListOf<Element>): void {
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

  private setupBubbleInteractions(bubbles: NodeListOf<Element>): void {
    bubbles.forEach((bubble: Element) => {
      const bubbleElement = bubble as HTMLElement;

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

      bubbleElement.addEventListener('click', () => {
        gsap.to(bubbleElement, {
          rotationY: '+=360',
          rotationX: '+=360',
          scale: 1.3,
          duration: 0.8,
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