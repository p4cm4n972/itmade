import {
  isPlatformBrowser
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  standalone: true
})
export class Services implements AfterViewInit {
  @ViewChild('servicesSection', { static: false }) servicesSection!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Enregistrer le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    this.initAnimations();
  }

  private initAnimations(): void {
    const section = this.servicesSection?.nativeElement;
    if (!section) return;

    // Animation du titre et sous-titre
    gsap.fromTo('.service-fade-in', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation de l'offre principale
    gsap.fromTo('.main-offer',
      {
        opacity: 0,
        scale: 0.9,
        y: 60
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.main-offer',
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation du badge de l'offre phare
    gsap.fromTo('.offer-badge',
      {
        opacity: 0,
        x: -30,
        rotation: -5
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.main-offer',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation des features de l'offre principale
    gsap.fromTo('.feature-check',
      {
        opacity: 0,
        x: -20
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6,
        scrollTrigger: {
          trigger: '.offer-features',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation du CTA principal
    gsap.fromTo('.offer-cta',
      {
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.9,
        scrollTrigger: {
          trigger: '.offer-cta',
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation des cartes de service
    gsap.fromTo('.service-card',
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.service-card',
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation des icônes de service
    gsap.fromTo('.service-icon',
      {
        opacity: 0,
        scale: 0,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.service-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation des éléments de prix
    gsap.fromTo('.price-item',
      {
        opacity: 0,
        x: -15
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.pricing-list',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );


    // Animation des cibles (target items)
    gsap.fromTo('.target-item',
      {
        opacity: 0,
        y: 20,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.target-list',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation hover pour les cartes de service
    const serviceCards = section.querySelectorAll('.service-card, .main-offer');
    serviceCards.forEach((card: Element) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Animation hover pour le CTA
    const ctaButton = section.querySelector('.offer-cta') as HTMLElement;
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    }
  }
}