import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-confidentialite',
  imports: [MatIconModule, RouterLink],
  templateUrl: './confidentialite.html',
  styleUrl: './confidentialite.scss'
})
export class Confidentialite implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Politique de confidentialité — ITMade studio',
      description: 'Politique de confidentialité et traitement des données personnelles d\'ITMade studio conformément au RGPD.',
      canonical: 'https://itmade.fr/confidentialite',
    });
  }
}
