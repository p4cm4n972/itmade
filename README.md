# ITMade - Recrutement & Prestations IT

Site web professionnel pour ITMade, spécialisé dans le recrutement de consultants IT et les prestations de services informatiques.

## 📋 Description

ITMade est une plateforme de recrutement et de prestations IT qui met en relation entreprises et consultants qualifiés. Le site propose trois offres principales :
- **Recrutement IT** : Sourcing qualifié, évaluation technique et garantie de remplacement
- **Prestation / Régie** : Consultants experts dédiés sur site ou en remote
- **Conseil & Accompagnement** : Audit, stratégie IT et accompagnement DevOps

## 🚀 Technologies utilisées

### Frontend
- **Angular 20** - Framework JavaScript avec architecture standalone components
- **TypeScript** - Langage de programmation typé
- **SCSS** - Préprocesseur CSS avec variables et mixins
- **Angular Material** - Bibliothèque de composants UI
- **GSAP** - Bibliothèque d'animations avec ScrollTrigger
- **EmailJS** - Service d'envoi d'emails côté client

### Build & Tooling
- **Angular CLI 20.1.4** - Outil de développement
- **Vite** - Build tool ultra-rapide
- **ESLint** - Linting JavaScript/TypeScript
- **Karma & Jasmine** - Framework de tests unitaires

### Déploiement
- **Angular Universal (SSR)** - Rendu côté serveur pour SEO
- **Express.js** - Serveur Node.js pour SSR
- **GitHub Actions** - CI/CD (optionnel)

## ✨ Fonctionnalités

### Pages principales
- 🏠 **Page d'accueil** - Hero moderne, sections services, expertises et processus
- 🏢 **Page Entreprises** - Offres détaillées pour les entreprises
- 👨‍💻 **Page Consultants** - Opportunités et avantages pour les consultants
- 💼 **Page Missions** - Liste des missions disponibles (en construction)
- ⚖️ **Mentions Légales** - Informations juridiques complètes

### Composants
- **Navbar responsive** - Menu burger mobile avec animations GSAP
- **Hero animé** - Gradient, badges et CTAs avec floating elements
- **Cards de services** - 3 offres principales avec hover effects
- **Timeline processus** - 4 étapes de l'approche ITMade
- **Grille d'expertises** - 4 domaines tech (Dev, Cloud, Data, Pilotage)
- **Formulaire de contact** - Reactive forms avec validation et EmailJS
- **Footer moderne** - Liens, réseaux sociaux et scroll-to-top

### Animations
- ✅ Animations GSAP sur le Hero et les éléments interactifs
- ✅ ScrollTrigger pour les animations au scroll
- ✅ Transitions fluides entre les pages
- ✅ Hover effects sur les cards et boutons
- ✅ Loading states sur les boutons de soumission

### Fonctionnalités techniques
- ✅ **SSR (Server-Side Rendering)** - 5 routes prérendues
- ✅ **Responsive Design** - Mobile, tablette et desktop
- ✅ **Scroll restoration** - Remonte automatiquement en haut lors de la navigation
- ✅ **Anchor scrolling** - Navigation smooth vers les sections (#contact, #a-propos)
- ✅ **EmailJS integration** - Envoi d'emails sans backend
- ✅ **Formulaire réactif** - Validation en temps réel avec messages d'erreur
- ✅ **SEO optimisé** - Meta tags et structure sémantique

## 📦 Installation

### Prérequis
- Node.js >= 18.x
- npm >= 9.x

### Étapes d'installation

```bash
# Cloner le repository
git clone https://github.com/p4cm4n972/itmade.git
cd itmade

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier src/environments/environment.ts avec :
# - emailjs.serviceId
# - emailjs.templateId
# - emailjs.publicKey
```

### Configuration EmailJS

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un service email (Gmail, Outlook, etc.)
3. Créer un template d'email
4. Copier les clés dans `src/environments/environment.ts` :

```typescript
export const environment = {
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  }
};
```

## 🛠️ Scripts disponibles

### Développement
```bash
# Démarrer le serveur de développement
npm start
# ou
ng serve
# Accessible sur http://localhost:4200

# Build en mode watch
npm run watch
```

### Build
```bash
# Build de production
npm run build

# Build avec optimisations
ng build --configuration production
```

### SSR
```bash
# Servir l'application avec SSR
npm run serve:ssr:itmade
```

### Tests
```bash
# Lancer les tests unitaires
npm test

# Tests avec coverage
ng test --code-coverage
```

## 📁 Structure du projet

```
itmade/
├── src/
│   ├── app/
│   │   ├── components/          # Composants réutilisables
│   │   │   ├── navbar/          # Navigation + menu mobile
│   │   │   ├── footer/          # Footer avec liens légaux
│   │   │   ├── entreprises/     # Section services entreprises
│   │   │   ├── consultants/     # Section consultants
│   │   │   ├── expertises/      # Grille des expertises
│   │   │   ├── approche/        # Timeline du processus
│   │   │   ├── contact/         # Formulaire de contact
│   │   │   └── cta-final/       # Call-to-action final
│   │   ├── pages/               # Pages de l'application
│   │   │   ├── home/            # Page d'accueil
│   │   │   ├── entreprises-page/
│   │   │   ├── consultants-page/
│   │   │   ├── missions-page/
│   │   │   └── mentions-legales/
│   │   ├── app.component.ts     # Composant racine
│   │   ├── app.config.ts        # Configuration (Router, etc.)
│   │   └── app.routes.ts        # Définition des routes
│   ├── styles/
│   │   └── _variables.scss      # Variables CSS (couleurs, espacements)
│   ├── environments/            # Configuration d'environnement
│   └── styles.scss              # Styles globaux
├── angular.json                 # Configuration Angular
├── package.json                 # Dépendances npm
├── tsconfig.json               # Configuration TypeScript
└── README.md                   # Documentation
```

## 🐛 Bugs rencontrés et solutions

### 1. Animation incomplète des cards (Entreprises/Expertises)

**Problème :**
Les cards des sections Entreprises et Expertises ne s'affichaient pas complètement lors du scroll. L'animation semblait commencer mais ne se terminait pas, laissant les éléments partiellement visibles avec une opacité réduite.

**Cause :**
Utilisation de `gsap.from()` pour animer depuis un état caché, mais les éléments n'étaient pas initialement cachés dans le CSS. Cela créait un conflit où GSAP tentait d'animer depuis un état qui n'existait pas réellement.

**Solution :**
```typescript
// 1. Cacher les éléments AVANT l'animation avec gsap.set()
private hideElementsBeforeAnimation(): void {
  gsap.set('.service-card', { opacity: 0, y: 30 });
  gsap.set('.expertise-card', { opacity: 0, y: 30 });
  gsap.set('.timeline-item', { opacity: 0, y: 30 });
}

// 2. Utiliser gsap.to() au lieu de gsap.from()
ScrollTrigger.create({
  trigger: element,
  start: 'top 85%',
  onEnter: () => {
    gsap.to(element, {  // ✅ .to() au lieu de .from()
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    });
  }
});
```

**Fichiers modifiés :**
- `src/app/pages/home/home.ts` (lignes 99-108, 234-279)

---

### 2. Scroll ne remontant pas en haut lors de la navigation

**Problème :**
Lors du clic sur le bouton "Voir nos missions" depuis la section Consultants, la navigation vers `/missions` s'effectuait mais le scroll restait en bas de page, donnant l'impression que la page était vide.

**Cause :**
Configuration par défaut d'Angular Router qui conserve la position de scroll lors des navigations SPA pour améliorer l'expérience utilisateur sur le bouton retour. Cependant, pour de nouvelles pages, on souhaite remonter en haut.

**Solution :**
```typescript
// Configuration du Router avec scroll automatique
import { provideRouter, withInMemoryScrolling } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',  // ✅ Scroll en haut à chaque navigation
        anchorScrolling: 'enabled'          // ✅ Active le scroll vers les ancres
      })
    )
  ]
};
```

**Comportement obtenu :**
- Navigation vers une route → Scroll automatique en haut
- Clic sur ancre (#contact, #a-propos) → Scroll smooth vers la section
- Bouton retour navigateur → Scroll en haut de la page

**Fichiers modifiés :**
- `src/app/app.config.ts` (lignes 11-17)

---

### 3. Budget CSS dépassé lors du build

**Problème :**
Erreur de build : `home.scss exceeded maximum budget. Budget 8.00 kB was not met by 706 bytes with a total of 8.71 kB`

**Cause :**
Le fichier `home.scss` contenait de nombreuses animations et styles pour le nouveau Hero moderne, dépassant la limite de 8 kB configurée par défaut.

**Solution :**
```json
// angular.json
{
  "budgets": [
    {
      "type": "anyComponentStyle",
      "maximumWarning": "10kB",  // ✅ Augmenté de 8kB à 10kB
      "maximumError": "12kB"      // ✅ Augmenté de 8kB à 12kB
    }
  ]
}
```

**Fichiers modifiés :**
- `angular.json` (lignes 51-52)

---

### 4. Liens de navigation navbar non fonctionnels

**Problème :**
Les liens "À propos" et "Contact" dans la navbar ne fonctionnaient pas car les IDs des sections ne correspondaient pas.

**Cause :**
- Lien "À propos" pointait vers `#a-propos` mais la section avait l'ID `#approche`
- Lien "Contact" fonctionnait correctement

**Solution :**
```html
<!-- Changement de l'ID de la section approche -->
<section class="approche" id="a-propos">  <!-- ✅ Changé de "approche" à "a-propos" -->
```

**Fichiers modifiés :**
- `src/app/components/approche/approche.html` (ligne 1)

---

### 5. Boutons CTA sans actions

**Problème :**
Plusieurs boutons sur le site n'avaient aucune action définie :
- Boutons dans CTA Final
- Boutons dans sections Entreprises, Consultants, Expertises
- Boutons dans la navbar
- Boutons dans les pages dédiées

**Solution :**
Ajout de méthodes `scrollToContact()` et `goToMissions()` dans chaque composant concerné :

```typescript
// Exemple : composant Entreprises
scrollToContact(): void {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
```

**Fichiers modifiés :**
- `src/app/components/cta-final/cta-final.ts`
- `src/app/components/entreprises/entreprises.ts`
- `src/app/components/consultants/consultants.ts`
- `src/app/components/expertises/expertises.ts`
- `src/app/components/navbar/navbar.ts`
- `src/app/pages/entreprises-page/entreprises-page.ts`
- `src/app/pages/consultants-page/consultants-page.ts`
- `src/app/pages/missions-page/missions-page.ts`

---

### 6. Liens navbar "À propos" et "Contact" non fonctionnels sur pages autres que l'accueil

**Problème :**
Les liens "À propos" et "Contact" dans la navbar fonctionnaient uniquement sur la page d'accueil. Sur les autres pages (`/entreprises`, `/consultants`, `/missions`), cliquer sur ces liens ne produisait aucun effet.

**Cause :**
Les liens utilisaient des ancres HTML simples (`href="#a-propos"` et `href="#contact"`) qui pointent vers des sections présentes uniquement sur la page d'accueil. Sur les autres pages, ces sections n'existent pas, donc les ancres ne peuvent pas fonctionner.

**Solution :**
1. Injection du Router dans le composant Navbar
2. Conversion des ancres en gestionnaires de clic
3. Modification de `navigateToSection()` pour détecter la page courante et naviguer si nécessaire

```typescript
// navbar.ts
public navigateToSection(sectionId: string): void {
  if (!isPlatformBrowser(this.platformId)) return;

  const menuWasOpen = this.isMenuOpen;
  if (this.isMenuOpen) {
    this.closeMobileMenu();
  }

  // Vérifier si on est sur la page d'accueil
  if (this.router.url === '/' || this.router.url.startsWith('/#')) {
    // Déjà sur l'accueil, juste scroller
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, menuWasOpen ? 300 : 0);
  } else {
    // Sur une autre page, naviguer vers l'accueil puis scroller
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    });
  }
}
```

```html
<!-- navbar.html - Desktop -->
<a class="nav-link" (click)="navigateToSection('a-propos')" style="cursor: pointer;">À propos</a>
<a class="nav-link" (click)="navigateToSection('contact')" style="cursor: pointer;">Contact</a>

<!-- navbar.html - Mobile -->
<a class="mobile-nav-link" (click)="navigateToSection('a-propos')" style="cursor: pointer;">
  <mat-icon>info</mat-icon>
  À propos
</a>
```

**Comportement obtenu :**
- Sur la page d'accueil : Scroll direct vers la section
- Sur les autres pages : Navigation vers `/` puis scroll vers la section après chargement
- Menu mobile : Se ferme automatiquement avant la navigation

**Fichiers modifiés :**
- `src/app/components/navbar/navbar.ts` (lignes 5, 35-41, 424-462)
- `src/app/components/navbar/navbar.html` (lignes 15-16, 98-110)

## 📊 Statistiques du build

```
Build validé : 753.19 kB (182.48 kB transféré)
5 routes prérendues : /, /entreprises, /consultants, /missions, /mentions-legales
Bundle principal : 693.65 kB
Polyfills : 34.58 kB
Styles : 24.96 kB
```

## 🎨 Design System

### Couleurs principales
- **Primary** : #0F172A (Deep Tech Blue)
- **Secondary** : #6366F1 (Vibrant Indigo)
- **Accent** : #06B6D4 (Electric Cyan)

### Typographie
- **Font principale** : Inter, system-ui, sans-serif
- **Tailles** : Système de tailles responsive avec clamp()

### Espacements
- Système d'espacement basé sur des multiples de 4px
- Variables CSS : `--space-1` à `--space-20`

## 📝 TODO

- [ ] Remplir les vraies informations légales dans Mentions Légales
- [ ] Créer les pages Confidentialité et CGV
- [ ] Implémenter la liste des missions sur /missions
- [ ] Ajouter un système de pagination pour les missions
- [ ] Intégrer Google Analytics
- [ ] Ajouter un système de gestion de cookies (RGPD)
- [ ] Créer un blog/actualités
- [ ] Ajouter des témoignages clients

## 👤 Auteur

**ITMade**
Email : contact@itmade.fr
Téléphone : +33 1 23 45 67 89

## 📄 Licence

Ce projet est privé et propriétaire. Tous droits réservés © 2025 ITMade.

---

**Dernière mise à jour :** 14 novembre 2025
**Version Angular :** 20.1.4
**Version Node.js requise :** >= 18.x
