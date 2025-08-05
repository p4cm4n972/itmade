import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-offres',
  imports: [MatCardModule],
  templateUrl: './offres.html',
  styleUrl: './offres.scss'
})
export class Offres implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      setTimeout(() => {

        requestAnimationFrame(() => {
          gsap.utils.toArray('.gsap-fade-up').forEach((el:any, i) => {
            gsap.from(el, {
              opacity: 0,
              y: 40,
              duration: 1,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            });
          });
        });

      }, 0);
    }
  }




}
