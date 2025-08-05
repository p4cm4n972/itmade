import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Services } from "../../components/services/services";
import { Features } from "../../components/features/features";
import { About } from "../../components/about/about";
import { Contact } from "../../components/contact/contact";
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from "../../components/footer/footer";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [Services, Features, About, Contact, MatIconModule,MatButtonModule ,Footer]
})
export class Home implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  @ViewChild('hero', { static: true }) hero!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      

      setTimeout(() => {

        requestAnimationFrame(() => {
          this.animateLayeredPinning();

          this.animateHero();
          this.animateOnScroll('.hero-fade-in', { y: 50 });
          this.animateOnScroll('.hero-slide-in-right', { x: 100 });
        });

      }, 0);
    }
  }




  private animateHero() {
    gsap.timeline()
      .from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      })
      .from('.hero-content p', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.cta-button', {
        duration: 0.6,
        y: 30,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.floating-card', {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.8')
      ;

    // Floating animation
    gsap.to('.floating-card', {
      duration: 3,
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });


  }

  private animateLayeredPinning(): void {
    const options = {
      start: 'top top',
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: true,
    };

    gsap.utils.toArray<HTMLElement>('[class$="-panel"]').forEach((panel, i) => {
      if (panel.classList.contains('no-pin')) return;
      ScrollTrigger.create({
        trigger: panel,
        ...options,
      });
    });

    gsap.from('.footer', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
    });

    // Parallax effect for hero background
      gsap.to('.hero', {
        ease: "none",
        scrollTrigger: {
          trigger: '.hero',
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          pinSpacing: false,
        }
      });

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
