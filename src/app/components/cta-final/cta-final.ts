import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cta-final',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './cta-final.html',
  styleUrl: './cta-final.scss'
})
export class CtaFinal {
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
