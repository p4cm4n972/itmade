import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-mentions-legales',
  imports: [MatIconModule, RouterLink],
  templateUrl: './mentions-legales.html',
  styleUrl: './mentions-legales.scss'
})
export class MentionsLegales implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Mentions légales — ITMade studio',
      description: 'Mentions légales d\'ITMade studio — éditeur, hébergeur, propriété intellectuelle et conditions d\'utilisation du site itmade.fr.',
      canonical: 'https://itmade.fr/mentions-legales',
    });
  }
  currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
