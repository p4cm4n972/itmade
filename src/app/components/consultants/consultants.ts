import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-consultants',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './consultants.html',
  styleUrl: './consultants.scss'
})
export class Consultants {
  constructor(private router: Router) {}

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToMissions(): void {
    this.router.navigate(['/missions']);
  }
}
