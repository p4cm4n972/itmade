import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  // Configuration EmailJS depuis les variables d'environnement
  private readonly EMAIL_SERVICE_ID = environment.emailjs.serviceId;
  private readonly EMAIL_TEMPLATE_ID = environment.emailjs.templateId;
  private readonly EMAIL_PUBLIC_KEY = environment.emailjs.publicKey;

  // Formulaire reactif
  contactForm!: FormGroup;

  isSubmitting = false;
  statusMessage = '';
  statusClass = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    // Initialiser le formulaire
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Initialiser EmailJS côté client uniquement
    if (isPlatformBrowser(this.platformId)) {
      emailjs.init(this.EMAIL_PUBLIC_KEY);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Cacher immédiatement les éléments avant animation
      this.hideElementsBeforeAnimation();

      // ✅ Retarde l'exécution jusqu'à ce que DOM soit prêt
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.animateOnScroll('.contact-fade-in', { y: 50 });
        });
      }, 100);
    }
  }

  // NOUVELLE MÉTHODE : Cacher les éléments avant animation
  private hideElementsBeforeAnimation(): void {
    gsap.set('.contact-fade-in', {
      opacity: 0,
      y: 50
    });
  }

  // MÉTHODE CORRIGÉE : Utilise gsap.to() au lieu de gsap.from()
  private animateOnScroll(selector: string, animation: gsap.TweenVars): void {
    gsap.utils.toArray(selector).forEach((el: any) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          // Utiliser gsap.to() pour animer vers l'état final
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        },
        onLeave: () => {
          // Optionnel : réanimer vers l'état caché quand on sort
          gsap.to(el, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: 'power3.out'
          });
        },
        onEnterBack: () => {
          // Réanimer quand on revient
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        }
      });
    });
  }

  // Helper pour récupérer les contrôles du formulaire
  get f() {
    return this.contactForm.controls;
  }

  // Vérifier si un champ a des erreurs et a été touché
  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Récupérer le message d'erreur pour un champ
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Ce champ est requis';
    if (field.errors['email']) return 'Email invalide';
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    return 'Erreur de validation';
  }

  // Soumission du formulaire - Version EmailJS directe avec reactive forms
  async onSubmit() {
    this.statusMessage = '';

    // Marquer tous les champs comme touchés pour afficher les erreurs
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });

    // Validation côté client
    if (this.contactForm.invalid) {
      this.statusMessage = 'Veuillez corriger les erreurs dans le formulaire.';
      this.statusClass = 'error';
      return;
    }

    // Animation du bouton
    this.animateButton();

    this.isSubmitting = true;

    try {
      // Vérifier si on est côté client
      if (!isPlatformBrowser(this.platformId)) {
        throw new Error('Formulaire disponible uniquement côté client');
      }

      // Récupérer les valeurs du formulaire
      const formValues = this.contactForm.value;

      // Préparation des données pour EmailJS
      const templateParams = {
        from_name: formValues.name.trim(),
        from_email: formValues.email.trim(),
        subject: formValues.subject.trim(),
        message: formValues.message.trim(),
        reply_to: formValues.email.trim(),
        timestamp: new Date().toLocaleString('fr-FR')
      };

      // Envoi avec EmailJS côté client
      const response = await emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        templateParams,
        this.EMAIL_PUBLIC_KEY
      );

      if (response.status === 200) {
        this.statusMessage = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
        this.statusClass = 'success';
        this.contactForm.reset();

        // Animation de succès
        this.animateSuccess();

        console.log('✅ Email envoyé avec succès via EmailJS');
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);

      // Gestion des erreurs EmailJS
      if (error.status === 400) {
        this.statusMessage = 'Erreur de validation. Vérifiez vos données.';
      } else if (error.status === 429) {
        this.statusMessage = 'Trop de tentatives. Veuillez patienter avant de réessayer.';
      } else if (error.text && error.text.includes('Invalid email')) {
        this.statusMessage = 'Adresse email invalide.';
      } else if (error.text && error.text.includes('rate limit')) {
        this.statusMessage = 'Limite d\'envoi atteinte. Réessayez dans quelques minutes.';
      } else {
        this.statusMessage = 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à contact@itmade.fr';
      }

      this.statusClass = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  // Animation du bouton
  private animateButton(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to('.submit-btn', {
        duration: 0.2,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  }

  // Animation de succès
  private animateSuccess(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.status-message.success', {
        duration: 0.6,
        scale: 0.8,
        opacity: 0,
        y: 20,
        ease: "back.out(1.7)"
      });
    }
  }
}