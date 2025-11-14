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
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('visualCard', { static: false }) visualCard!: ElementRef;

  private scrollTriggers: ScrollTrigger[] = [];
  private animations: gsap.core.Animation[] = [];
  private isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    // Détection mobile
    this.isMobile = window.innerWidth <= 768;

    // Initialiser les animations avec un délai
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.initializeAnimations();
        this.setupResponsiveListeners();
      });
    }, 100);
  }

  ngOnDestroy(): void {
    // Nettoyage des animations et ScrollTriggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.animations.forEach(animation => animation.kill());
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Nettoyer les event listeners
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

    // Re-initialiser
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  private initializeAnimations(): void {
    // Cacher les éléments avant animation
    this.hideElementsBeforeAnimation();

    this.animateHero();
    this.animateVisualCard();
    this.animateScrollElements();
  }

  /**
   * Cacher les éléments avant animation pour éviter les flashs
   */
  private hideElementsBeforeAnimation(): void {
    // Cacher les cards des sections
    gsap.set('.service-card', { opacity: 0, y: 30 });
    gsap.set('.expertise-card', { opacity: 0, y: 30 });
    gsap.set('.timeline-item', { opacity: 0, y: 30 });

    // Cacher les headers de sections
    gsap.set(['.entreprises .section-header', '.consultants .section-header', '.expertises .section-header', '.approche .section-header'], { opacity: 0, y: 50 });
    gsap.set(['.entreprises .section-badge', '.consultants .section-badge', '.expertises .section-badge', '.approche .section-badge'], { opacity: 0, scale: 0 });
  }

  /**
   * Animation du Hero principal
   */
  private animateHero(): void {
    const timeline = gsap.timeline();

    timeline
      // Badge
      .from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      // Title
      .from('.hero-title .title-line', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.3')
      // Subtitle
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      // CTA Buttons
      .from('.hero-cta .btn', {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }, '-=0.3')
      // Stats
      .from('.hero-stats .stat-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');

    this.animations.push(timeline);
  }

  /**
   * Animation de la visual card et des floating elements
   */
  private animateVisualCard(): void {
    if (!this.visualCard) return;

    const timeline = gsap.timeline();

    // Visual Card
    timeline
      .from('.visual-card', {
        x: this.isMobile ? 0 : 100,
        y: this.isMobile ? 50 : 0,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      // Floating elements
      .from('.floating-element', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.5');

    // Animation de flottement continue pour la visual card
    if (!this.isMobile) {
      const floatingAnim = gsap.to('.visual-card', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      this.animations.push(floatingAnim);
    }

    this.animations.push(timeline);
  }

  /**
   * Animations au scroll pour les autres sections
   */
  private animateScrollElements(): void {
    // Animation du scroll indicator
    const scrollIndicator = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      onUpdate: (self) => {
        gsap.to('.scroll-indicator', {
          opacity: 1 - self.progress,
          duration: 0.3
        });
      }
    });
    this.scrollTriggers.push(scrollIndicator);

    // Animations des sections qui entrent dans le viewport
    const sections = [
      '.entreprises',
      '.consultants',
      '.expertises',
      '.approche',
      '.cta-final'
    ];

    sections.forEach(selector => {
      const trigger = ScrollTrigger.create({
        trigger: selector,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(`${selector} .section-header`, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          });

          gsap.to(`${selector} .section-header .section-badge`, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });
        },
        once: true
      });
      this.scrollTriggers.push(trigger);
    });

    // Animation spécifique pour les cards
    const cardSections = [
      '.service-card',
      '.expertise-card',
      '.timeline-item'
    ];

    cardSections.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power3.out'
            });
          },
          once: true
        });
        this.scrollTriggers.push(trigger);
      });
    });
  }

  /**
   * Méthode publique pour scroller vers une section
   */
  public scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = this.isMobile ? 60 : 80;
      const top = element.offsetTop - offset;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  }
}
