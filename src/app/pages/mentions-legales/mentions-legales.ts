import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  imports: [MatIconModule, RouterLink],
  templateUrl: './mentions-legales.html',
  styleUrl: './mentions-legales.scss'
})
export class MentionsLegales {
  currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
