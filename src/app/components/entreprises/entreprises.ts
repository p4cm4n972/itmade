import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-entreprises',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './entreprises.html',
  styleUrl: './entreprises.scss'
})
export class Entreprises {
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
