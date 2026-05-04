import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);

  private readonly defaultOgImage = 'https://itmade.fr/assets/logos/logo-01.png';

  setPage(config: SeoConfig): void {
    this.titleService.setTitle(config.title);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: config.canonical });
    this.meta.updateTag({ property: 'og:image', content: config.ogImage ?? this.defaultOgImage });
    this.meta.updateTag({ property: 'twitter:url', content: config.canonical });
    this.meta.updateTag({ property: 'twitter:title', content: config.title });
    this.meta.updateTag({ property: 'twitter:description', content: config.description });

    this.setCanonical(config.canonical);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    const existing = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const link: HTMLLinkElement = existing ?? (() => {
      const el = this.document.createElement('link') as HTMLLinkElement;
      el.setAttribute('rel', 'canonical');
      head.appendChild(el);
      return el;
    })();
    link.setAttribute('href', url);
  }
}
