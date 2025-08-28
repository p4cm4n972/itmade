# Debug Erreur 500 - Server.ts

## 🔍 Étape 1: Vérifier les logs

### Logs Angular SSR
```bash
# Voir les logs du serveur Angular
pm2 logs verstack-api --lines 20

# Ou si vous utilisez un autre nom
pm2 status
pm2 logs [nom-de-votre-app] --lines 20
```

### Logs en temps réel
```bash
# Suivre les logs en temps réel
pm2 logs verstack-api --lines 0
```

## 🛠️ Étape 2: Test direct du serveur

### Test local du serveur
```bash
# Aller dans le dossier du projet
cd /var/www/html/itmade/itmade

# Build le projet
npm run build

# Démarrer le serveur manuellement pour voir les erreurs
node dist/server/server.mjs
```

## 🔧 Étape 3: Vérifications communes

### 1. Vérifier les dépendances
```bash
# S'assurer que les packages sont installés
npm list @emailjs/nodejs
npm list validator
npm list @types/validator
```

### 2. Test de la route health
```bash
# Tester la route de santé
curl https://itmade.fr/api/contact/health
```

### 3. Vérifier la syntaxe TypeScript
```bash
# Compiler pour voir les erreurs
npx tsc --noEmit
```

## 🚨 Problèmes potentiels et solutions

### Problème 1: Import ES Modules
Dans server.ts, les imports peuvent poser problème. Essayez :

```typescript
// Au lieu de :
import emailjs from '@emailjs/nodejs';
import validator from 'validator';

// Essayez :
const emailjs = require('@emailjs/nodejs');
const validator = require('validator');
```

### Problème 2: Configuration EmailJS
Ajoutez des logs de debug :

```typescript
// Avant l'envoi EmailJS, ajoutez :
console.log('Configuration EmailJS:', {
  serviceId: EMAILJS_CONFIG.serviceId,
  templateId: EMAILJS_CONFIG.templateId,
  publicKeyExists: !!EMAILJS_CONFIG.publicKey
});

console.log('Template params:', templateParams);
```

### Problème 3: Gestion d'erreurs améliorée
Modifiez la route pour plus de détails :

```typescript
app.post('/api/contact/send-email', async (req: any, res: any): Promise<void> => {
  try {
    console.log('📧 Début traitement email');
    console.log('Body reçu:', req.body);
    
    // ... reste du code ...
    
  } catch (error: any) {
    console.error('❌ Erreur détaillée:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
```

## 🔄 Étape 4: Rebuild et redémarrage

```bash
# 1. Rebuild complet
npm run build

# 2. Redémarrer PM2
pm2 restart verstack-api

# 3. Vérifier les logs
pm2 logs verstack-api --lines 10
```

## 📋 Étape 5: Test détaillé

```bash
# Test avec curl détaillé
curl -v -X POST https://itmade.fr/api/contact/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Debug",
    "email": "test@example.com",
    "subject": "Test 500 Error",
    "message": "Message de test pour debug erreur 500"
  }'
```

## 🚦 Alternative temporaire

Si l'erreur persiste, vous pouvez temporairement utiliser l'API séparée (server/server.js) :

```bash
# Démarrer l'API standalone
cd /var/www/html/itmade/itmade/server
pm2 start server.js --name itmade-contact-standalone
```

Et configurer Nginx pour pointer vers le port 3001.