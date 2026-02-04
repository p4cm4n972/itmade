# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 20 SSR-enabled business website for "itmade", built with modern Angular standalone components and GSAP animations. The site showcases technology services with interactive animations and responsive design.

## Development Commands

### Essential Commands
- `npm start` or `ng serve` - Start development server on http://localhost:4200
- `npm run build` or `ng build` - Build the project for production
- `npm run watch` or `ng build --watch --configuration development` - Build in watch mode
- `npm test` or `ng test` - Run unit tests with Karma
- `npm run serve:ssr:itmade` - Serve the SSR build

### Angular CLI Commands
- `ng generate component component-name` - Generate new components (configured for SCSS)
- `ng generate --help` - List all available schematics

## Architecture

### Application Structure
- **Standalone Components**: Uses Angular 20's standalone component architecture (no NgModules)
- **SSR Enabled**: Server-side rendering configured with Angular Universal
- **Component Organization**: 
  - `src/app/components/` - Reusable UI components (navbar, footer, services, features, about, contact)
  - `src/app/pages/` - Page-level components (home, offres)
- **Routing**: Simple route configuration in `app.routes.ts` (currently only home page)

### Key Technologies
- **Angular 20** with standalone components
- **Angular Material** for UI components (buttons, icons)
- **GSAP** with ScrollTrigger for complex animations
- **SCSS** for styling with modular architecture
- **TypeScript** with strict mode enabled
- **Express.js** for SSR server

### Component Architecture
- All components are standalone (imports array instead of NgModules)
- Heavy use of ViewChild for direct DOM manipulation with GSAP
- Platform detection for SSR compatibility (`isPlatformBrowser`)
- Responsive animations with mobile/desktop configurations
- Proper cleanup in `ngOnDestroy` for animations and event listeners

### Styling Architecture
- **CSS Custom Properties**: Root variables in `_variables.scss`
- **Modular SCSS**: Separate files for each component (`_navbar.scss`, `_hero.scss`, etc.)
- **Main Style**: `src/styles.scss` imports all modular styles
- **Component Styles**: Each component has its own `.scss` file

### Animation System
- **GSAP Core**: Complex timeline-based animations
- **ScrollTrigger**: Scroll-based animations and pinning effects
- **Responsive**: Different animation configs for mobile vs desktop
- **Performance Optimized**: Cleanup on component destroy, reduced animations on mobile
- **SSR Safe**: All animations wrapped in `isPlatformBrowser` checks

## Code Conventions

### TypeScript Configuration
- **Strict Mode**: All TypeScript strict checks enabled
- **Angular Strict**: Template type checking enabled
- **Experimental Decorators**: Required for Angular components

### Component Patterns
- Use `signal()` for reactive properties where appropriate
- Inject `PLATFORM_ID` and check `isPlatformBrowser` for client-only code
- Implement proper cleanup in `ngOnDestroy`
- Use ViewChild for direct DOM access when needed for animations

### Animation Patterns
- Hide elements before animation with `gsap.set()`
- Use `setTimeout` + `requestAnimationFrame` for initialization timing
- Store animations/triggers in arrays for proper cleanup
- Different configs for mobile vs desktop performance

## Branding & Footer Convention

- **Nom de l'entreprise**: Toujours utiliser "ITMade studio" (pas "ITMade" seul)
- **Copyright footer**: Format obligatoire `© {année de création} - {année courante} ITMade studio.`
  - Année de création: 2025 (fixe)
  - Année courante: dynamique via `new Date().getFullYear()`
  - Exemple: "© 2025 - 2026 ITMade studio. Tous droits réservés."

## Important Notes

- **SSR Compatibility**: Always check `isPlatformBrowser` before accessing window/document
- **Performance**: Mobile animations are simplified for better performance
- **Cleanup**: Critical to clean up GSAP animations and ScrollTriggers in ngOnDestroy
- **Responsive**: Component logic adapts animations based on screen size detection

---

## Communication - Standard GAFAM

### Standard d'expertise (Google, Apple, Meta, Amazon, Microsoft)

Adopter systématiquement le niveau d'argumentation et de rigueur technique attendu d'un **Staff Engineer / Principal Engineer** :

#### 1. Argumentation structurée type "Design Doc"
- **Contexte** : Quel problème résout-on ? Pourquoi maintenant ?
- **Options considérées** : Lister au moins 2-3 approches alternatives
- **Trade-offs (compromis)** : Analyser explicitement les avantages/inconvénients
- **Décision et justification** : Expliquer pourquoi cette solution
- **Risques et mitigations** : Identifier les failure modes (modes de défaillance)

#### 2. Profondeur technique obligatoire
- **Complexité algorithmique** : Big-O notation quand pertinent
- **Memory footprint (empreinte mémoire)** : Impact sur heap et GC
- **Latency (latence)** : Percentiles P50, P95, P99
- **Scalabilité** : Comportement sous charge
- **Idempotence** : Opérations rejouables sans side-effects

#### 3. Patterns architecturaux
- **SOLID** : Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **DDD** : Bounded contexts, aggregates, value objects
- **Event-Driven** : Event sourcing, CQRS, saga patterns
- **Distributed systems** : CAP theorem, eventual consistency, circuit breakers

#### 4. Anticipation des edge cases
- **Race conditions** : Accès simultanés, deadlocks
- **Null/undefined** : Defensive programming
- **Network failures** : Timeouts, retries avec exponential backoff
- **Data validation** : Input sanitization aux boundaries

#### 5. Maintenabilité long terme
- **Technical debt** : Identifier et documenter
- **Backward compatibility** : Impact sur versions existantes
- **Migration path** : Chemin de l'état actuel à l'état cible
- **Observability** : Logging, metrics, tracing

### Définitions inline obligatoires
Pour tous les termes techniques anglais, ajouter une définition entre parenthèses :
- Exemple : "bypass (contourner)", "chunks (fragments)", "rollback (retour arrière)"

### Format de réponse
- **Réponses élaborées** : Explications approfondies
- **Exemples concrets** : Code ou scénarios réels
- **Nuances** : Éviter les affirmations absolues