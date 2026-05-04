import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CtaFinal } from "../../components/cta-final/cta-final";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-missions-page',
  imports: [MatIconModule, MatButtonModule, CtaFinal],
  templateUrl: './missions-page.html',
  styleUrl: './missions-page.scss'
})
export class MissionsPage implements OnInit {
  private seo = inject(SeoService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Missions IT disponibles — Freelance & CDI | ITMade studio',
      description: 'Découvrez les missions IT disponibles chez ITMade studio. Angular, React, Node.js, DevOps, Data, Product Owner — toutes les expertises, partout en France.',
      canonical: 'https://itmade.fr/missions',
    });
  }

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
