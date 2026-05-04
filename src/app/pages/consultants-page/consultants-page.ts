import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Consultants } from "../../components/consultants/consultants";
import { Expertises } from "../../components/expertises/expertises";
import { Approche } from "../../components/approche/approche";
import { CtaFinal } from "../../components/cta-final/cta-final";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-consultants-page',
  imports: [MatIconModule, MatButtonModule, Consultants, Expertises, Approche, CtaFinal],
  templateUrl: './consultants-page.html',
  styleUrl: './consultants-page.scss'
})
export class ConsultantsPage implements OnInit {
  private seo = inject(SeoService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Consultants IT — Missions & Opportunités | ITMade studio',
      description: 'Consultant IT freelance ou en recherche d\'emploi ? ITMade studio connecte les meilleurs experts IT avec les entreprises. CDI, missions, régie — l\'IT sur mesure.',
      canonical: 'https://itmade.fr/consultants',
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

  goToMissions(): void {
    this.router.navigate(['/missions']);
  }
}
