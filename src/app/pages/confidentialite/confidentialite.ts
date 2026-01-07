import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confidentialite',
  imports: [MatIconModule, RouterLink],
  templateUrl: './confidentialite.html',
  styleUrl: './confidentialite.scss'
})
export class Confidentialite {}
