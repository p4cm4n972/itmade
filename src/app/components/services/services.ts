import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

 ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // ✅ Retarde l'exécution jusqu'à ce que DOM soit prêt
      setTimeout(() => {
       
        requestAnimationFrame(() => {
          this.animateOnScroll('.service-fade-in', { y: -50 });
          this.animateOnScroll('.service-scale-in', { scale: 0.8 });
          

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
}
