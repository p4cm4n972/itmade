import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import {
  Component,
  AfterViewInit,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import gsap from 'gsap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  lastScroll = 0;

  ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      this.animateNavbar();
    }
  }

    private animateNavbar(): void {
    gsap.from('.navbar', {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.transform =
        currentScroll > this.lastScroll ? 'translateY(-100%)' : 'translateY(0)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    this.lastScroll = currentScroll;
  }
}

