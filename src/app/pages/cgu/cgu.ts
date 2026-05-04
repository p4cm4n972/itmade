import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-cgu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './cgu.html',
  styleUrl: './cgu.scss'
})
export class CGU implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Conditions Générales d\'Utilisation — ITMade studio',
      description: 'Conditions générales d\'utilisation du site itmade.fr — règles d\'accès, propriété intellectuelle et responsabilités d\'ITMade studio.',
      canonical: 'https://itmade.fr/cgu',
    });
  }
}
