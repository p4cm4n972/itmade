import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  // Configuration EmailJS
  private readonly EMAIL_SERVICE_ID = 'service_x00zprf';
  private readonly EMAIL_TEMPLATE_ID = 'template_wwdfjou';
  private readonly EMAIL_PUBLIC_KEY = 'Oe9QsLVCKgJbT6IFY';

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
    // Initialiser EmailJS
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
      }, 100); // Légèrement plus de délai pour être sûr
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

  // Soumission du formulaire
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
        throw new Error('EmailJS nécessite un environnement navigateur');
      }

      // Préparation des données pour EmailJS
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message,
        reply_to: 'manuel.adele@gmail.com',
      };

      // Envoi avec EmailJS
      const response = await emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        this.statusMessage = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
        this.statusClass = 'success';
        this.resetForm();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      this.statusMessage = 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à contact@itmade.fr';
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
}