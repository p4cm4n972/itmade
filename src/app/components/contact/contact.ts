import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Cacher immédiatement les éléments avant animation
      this.hideElementsBeforeAnimation();

      // Form submission
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', function (this: HTMLFormElement, e) {
          e.preventDefault();

          // Animation de feedback
          gsap.to('.submit-btn', {
            duration: 0.2,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
              alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
              this.reset();
            }
          });
        });
      }

      // ✅ Retarde l'exécution jusqu'à ce que DOM soit prêt
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.animateOnScroll('.contact-fade-in', { y: 50 });
        });
      }, 100); // Légèrement plus de délai pour être sûr
    }
  }

  // NOUVELLE MÉTHODE : Cacher les éléments avant animation
  private hideElementsBeforeAnimation(): void {
    gsap.set('.contact-fade-in', {
      opacity: 0,
      y: 50
    });
  }

  // MÉTHODE CORRIGÉE : Utilise gsap.to() au lieu de gsap.from()
  private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          // Utiliser gsap.to() pour animer vers l'état final
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        },
        onLeave: () => {
          // Optionnel : réanimer vers l'état caché quand on sort
          gsap.to(el, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power3.out'
          });
        },
        onEnterBack: () => {
          // Réanimer quand on revient
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        }
      });
    });
  }

  onSubmit() {
    gsap.to('.submit-btn', {
      duration: 0.2,
      scale: 0.95,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
      }
    });
  }
} 