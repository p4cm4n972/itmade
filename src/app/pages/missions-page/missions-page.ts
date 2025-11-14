import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CtaFinal } from "../../components/cta-final/cta-final";

@Component({
  selector: 'app-missions-page',
  imports: [MatIconModule, MatButtonModule, CtaFinal],
  templateUrl: './missions-page.html',
  styleUrl: './missions-page.scss'
})
export class MissionsPage {
  constructor(private router: Router) {}

  goToContact(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}
