import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Consultants } from "../../components/consultants/consultants";
import { Expertises } from "../../components/expertises/expertises";
import { Approche } from "../../components/approche/approche";
import { CtaFinal } from "../../components/cta-final/cta-final";

@Component({
  selector: 'app-consultants-page',
  imports: [MatIconModule, MatButtonModule, Consultants, Expertises, Approche, CtaFinal],
  templateUrl: './consultants-page.html',
  styleUrl: './consultants-page.scss'
})
export class ConsultantsPage {
  constructor(private router: Router) {}

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  goToMissions(): void {
    this.router.navigate(['/missions']);
  }
}
