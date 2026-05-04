import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Entreprises } from "../../components/entreprises/entreprises";
import { Approche } from "../../components/approche/approche";
import { Expertises } from "../../components/expertises/expertises";
import { CtaFinal } from "../../components/cta-final/cta-final";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-entreprises-page',
  imports: [MatIconModule, MatButtonModule, Entreprises, Approche, Expertises, CtaFinal],
  templateUrl: './entreprises-page.html',
  styleUrl: './entreprises-page.scss'
})
export class EntreprisesPage implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Recrutement IT & Prestation en régie — ITMade studio',
      description: 'Trouvez les meilleurs consultants IT pour vos projets. Recrutement CDI/freelance, prestation en régie, conseil technologique. ITMade studio, votre partenaire ESN.',
      canonical: 'https://itmade.fr/entreprises',
    });
  }

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
