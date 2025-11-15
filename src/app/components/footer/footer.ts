import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();
  appVersion = '2.0.0'; // Version from package.json

  socialLinks = [
    { icon: 'link', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'link', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'link', url: 'https://github.com', label: 'GitHub' }
  ];

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
