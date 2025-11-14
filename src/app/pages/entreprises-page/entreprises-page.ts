import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Entreprises } from "../../components/entreprises/entreprises";
import { Approche } from "../../components/approche/approche";
import { Expertises } from "../../components/expertises/expertises";
import { CtaFinal } from "../../components/cta-final/cta-final";

@Component({
  selector: 'app-entreprises-page',
  imports: [MatIconModule, MatButtonModule, Entreprises, Approche, Expertises, CtaFinal],
  templateUrl: './entreprises-page.html',
  styleUrl: './entreprises-page.scss'
})
export class EntreprisesPage {
  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
