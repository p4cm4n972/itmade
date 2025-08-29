import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  // Configuration EmailJS depuis les variables d'environnement
  private readonly EMAIL_SERVICE_ID = environment.emailjs.serviceId;
  private readonly EMAIL_TEMPLATE_ID = environment.emailjs.templateId;
  private readonly EMAIL_PUBLIC_KEY = environment.emailjs.publicKey;

  // État du formulaire
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  showErrors = false;
  statusMessage = '';
  statusClass = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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

  // Validation des champs
  isFieldInvalid(fieldName: string): boolean {
    const field = this.formData[fieldName as keyof typeof this.formData];
    return this.showErrors && (!field || field.trim() === '');
  }

  // Soumission du formulaire - Version EmailJS directe
  async onSubmit() {
    this.showErrors = true;
    this.statusMessage = '';

    // Validation côté client
    if (!this.isFormValid()) {
      this.statusMessage = 'Veuillez remplir tous les champs requis.';
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

      // Préparation des données pour EmailJS
      const templateParams = {
        from_name: this.formData.name.trim(),
        from_email: this.formData.email.trim(),
        subject: this.formData.subject.trim(),
        message: this.formData.message.trim(),
        reply_to: this.formData.email.trim(),
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
        this.resetForm();
        
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
        this.statusMessage = 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à manuel.adele@gmail.com';
      }
      
      this.statusClass = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  // Validation du formulaire
  private isFormValid(): boolean {
    return !!(this.formData.name.trim() && 
             this.formData.email.trim() && 
             this.formData.subject.trim() && 
             this.formData.message.trim() &&
             this.isValidEmail(this.formData.email));
  }

  // Validation email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Réinitialisation du formulaire
  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.showErrors = false;
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