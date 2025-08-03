import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // ✅ Retarde l'exécution jusqu'à ce que DOM soit prêt
      setTimeout(() => {
       
        requestAnimationFrame(() => {
          this.animateOnScroll('.about-slide-in-left', { x: -100 });
          this.animateOnScroll('.about-slide-in-right', { x: 100 });
        });

      }, 0);
    }
  }

   private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
        console.log(`GSAP found ${el.length} elements for ${selector} to ${JSON.stringify(animation)}`);
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
