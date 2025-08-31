import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      setTimeout(() => {
        
         requestAnimationFrame(() => {
          this.animateOnScroll('.feature-fade-in', { y: -50 });
          this.animateAdvantages();
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

  private animateAdvantages(): void {
    // Animation des avantages
    gsap.fromTo('.advantage-item',
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
        delay: 0.4,
        scrollTrigger: {
          trigger: '.advantages-grid',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animation des icônes d'avantages
    gsap.fromTo('.advantage-icon',
      {
        opacity: 0,
        scale: 0,
        rotation: 360
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.6,
        scrollTrigger: {
          trigger: '.advantages-grid',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }


}
