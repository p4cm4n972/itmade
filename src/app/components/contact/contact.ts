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
      // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
          contactForm.addEventListener('submit', function(this: HTMLFormElement, e) {
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

      }, 0);
    }
  }

   private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      gsap.from(el, {
        ...animation,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
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
