# Configuration Variables d'Environnement sur VPS Ubuntu

## 1. Configuration sur le Serveur Ubuntu

### Créer le fichier d'environnement
```bash
# Sur votre VPS Ubuntu
sudo nano /etc/environment
```

### Ajouter les variables EmailJS
```bash
# Ajouter ces lignes dans /etc/environment
EMAILJS_SERVICE_ID=service_x00zprf
EMAILJS_TEMPLATE_ID=template_wwdfjou  
EMAILJS_PUBLIC_KEY=Oe9QsLVCKgJbT6IFY
```

### Alternative : Fichier .env local
```bash
# Dans le dossier de votre application
nano .env

# Contenu du fichier .env
EMAILJS_SERVICE_ID=service_x00zprf
EMAILJS_TEMPLATE_ID=template_wwdfjou
EMAILJS_PUBLIC_KEY=Oe9QsLVCKgJbT6IFY
```

## 2. Configuration Angular pour les Variables d'Environnement

### Créer environment.prod.ts
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  emailjs: {
    serviceId: process.env['EMAILJS_SERVICE_ID'] || '',
    templateId: process.env['EMAILJS_TEMPLATE_ID'] || '',
    publicKey: process.env['EMAILJS_PUBLIC_KEY'] || ''
  }
};
```

### Créer environment.ts
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_x00zprf', // Pour le développement
    templateId: 'template_wwdfjou',
    publicKey: 'Oe9QsLVCKgJbT6IFY'
  }
};
```

## 3. Problème : Angular côté client ne peut pas lire process.env

**IMPORTANT :** Angular s'exécute dans le navigateur et ne peut pas accéder aux variables d'environnement du serveur directement.

## 4. Solution : API Endpoint sécurisé

### Créer une API sur votre VPS

#### Express.js API (recommandé)
```javascript
// server/api/config.js
const express = require('express');
const router = express.Router();

// Endpoint pour récupérer la config EmailJS (sans les clés sensibles)
router.get('/emailjs-config', (req, res) => {
  res.json({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY
  });
});

module.exports = router;
```

#### Service Angular pour récupérer la config
```typescript
// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  async getEmailJSConfig() {
    return this.http.get<{
      serviceId: string;
      templateId: string;
      publicKey: string;
    }>('/api/emailjs-config').toPromise();
  }
}
```

## 5. Meilleure Solution : API Backend complète

### API d'envoi d'email sécurisée
```javascript
// server/api/contact.js
const express = require('express');
const emailjs = require('@emailjs/nodejs');
const router = express.Router();

// Configuration depuis les variables d'environnement
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
});

router.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        reply_to: email
      }
    );

    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
});

module.exports = router;
```

### Angular utilise l'API
```typescript
// contact.component.ts
async onSubmit() {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.formData)
    });

    const data = await response.json();

    if (response.ok) {
      this.statusMessage = 'Message envoyé avec succès !';
      this.statusClass = 'success';
      this.resetForm();
    }
  } catch (error) {
    this.statusMessage = 'Erreur lors de l\'envoi';
    this.statusClass = 'error';
  }
}
```

## 6. Installation et Configuration sur Ubuntu

### Installation Node.js/Express
```bash
# Sur votre VPS
cd /var/www/itmade
npm init -y
npm install express @emailjs/nodejs cors helmet
npm install -g pm2  # Pour la gestion des processus
```

### Démarrage automatique
```bash
# Créer le service avec PM2
pm2 start server.js --name "itmade-api"
pm2 startup
pm2 save
```

### Configuration Nginx (si utilisé)
```nginx
# /etc/nginx/sites-available/itmade
server {
    listen 80;
    server_name itmade.fr;
    
    # API Backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Angular App
    location / {
        root /var/www/itmade/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

## Recommandation

**Pour votre VPS Ubuntu, je recommande l'approche API backend** car :
- ✅ Clés 100% sécurisées sur le serveur
- ✅ Contrôle total
- ✅ Évolutif pour d'autres fonctionnalités

Voulez-vous que j'implémente cette solution API backend ?