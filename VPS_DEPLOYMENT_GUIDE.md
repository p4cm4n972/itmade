# Guide de Déploiement VPS Ubuntu - API Sécurisée ITMade

## 1. Préparation du VPS Ubuntu

### Mise à jour du système
```bash
sudo apt update && sudo apt upgrade -y
```

### Installation Node.js
```bash
# Installation Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification
node --version
npm --version
```

### Installation PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

## 2. Configuration des Variables d'Environnement

### Créer le fichier .env
```bash
# Aller dans le dossier de votre application
cd /var/www/itmade/server

# Créer le fichier .env
sudo nano .env
```

### Contenu du fichier .env
```bash
# Configuration EmailJS
EMAILJS_SERVICE_ID=service_x00zprf
EMAILJS_TEMPLATE_ID=template_wwdfjou
EMAILJS_PUBLIC_KEY=Oe9QsLVCKgJbT6IFY
EMAILJS_PRIVATE_KEY=votre_private_key_ici

# Configuration Serveur
NODE_ENV=production
PORT=3000

# Sécurité
ALLOWED_ORIGINS=https://itmade.fr,https://www.itmade.fr
```

### Sécuriser le fichier
```bash
sudo chmod 600 .env
sudo chown www-data:www-data .env
```

## 3. Installation des Dépendances Backend

```bash
# Dans le dossier /var/www/itmade/server
cd /var/www/itmade/server
npm install
```

### Structure des fichiers créés
```
/var/www/itmade/
├── dist/                 # Build Angular (généré par ng build)
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── routes/
│       └── contact.js
└── ... (autres fichiers Angular)
```

## 4. Build de l'Application Angular

```bash
# Dans le dossier racine Angular
cd /var/www/itmade
npm run build

# Vérifier que le dossier dist est créé
ls -la dist/
```

## 5. Configuration PM2

### Créer le fichier de configuration PM2
```bash
sudo nano /var/www/itmade/server/ecosystem.config.js
```

### Contenu ecosystem.config.js
```javascript
module.exports = {
  apps: [{
    name: 'itmade-api',
    script: 'server.js',
    cwd: '/var/www/itmade/server',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/itmade-error.log',
    out_file: '/var/log/pm2/itmade-out.log',
    log_file: '/var/log/pm2/itmade-combined.log',
    time: true
  }]
};
```

### Démarrer avec PM2
```bash
# Créer les dossiers de logs
sudo mkdir -p /var/log/pm2
sudo chown www-data:www-data /var/log/pm2

# Démarrer l'application
cd /var/www/itmade/server
pm2 start ecosystem.config.js

# Sauvegarder la configuration
pm2 save

# Auto-démarrage au boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## 6. Configuration Nginx

### Créer la configuration Nginx
```bash
sudo nano /etc/nginx/sites-available/itmade
```

### Configuration Nginx
```nginx
server {
    listen 80;
    server_name itmade.fr www.itmade.fr;

    # Sécurité
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # API Backend (Node.js)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout pour les emails
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Angular App (Fichiers statiques)
    location / {
        root /var/www/itmade/dist;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        
        # Cache des assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Logs
    access_log /var/log/nginx/itmade.access.log;
    error_log /var/log/nginx/itmade.error.log;
}
```

### Activer le site
```bash
sudo ln -s /etc/nginx/sites-available/itmade /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. SSL avec Certbot (Optionnel mais recommandé)

```bash
# Installation Certbot
sudo apt install certbot python3-certbot-nginx -y

# Génération du certificat SSL
sudo certbot --nginx -d itmade.fr -d www.itmade.fr
```

## 8. Tests et Vérifications

### Vérifier le service
```bash
# Status PM2
pm2 status

# Logs en temps réel
pm2 logs itmade-api

# Test API
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Message de test"}'
```

### Vérifier Nginx
```bash
sudo nginx -t
sudo systemctl status nginx
```

## 9. Surveillance et Maintenance

### Commandes PM2 utiles
```bash
# Redémarrer l'application
pm2 restart itmade-api

# Recharger la configuration
pm2 reload itmade-api

# Voir les logs
pm2 logs itmade-api --lines 100

# Monitoring
pm2 monit
```

### Logs à surveiller
- `/var/log/pm2/itmade-error.log` - Erreurs de l'application
- `/var/log/nginx/itmade.error.log` - Erreurs Nginx
- `/var/log/nginx/itmade.access.log` - Accès au site

## 10. Sauvegarde et Récupération

### Script de sauvegarde
```bash
#!/bin/bash
# Sauvegarde quotidienne
tar -czf /backup/itmade-$(date +%Y%m%d).tar.gz \
  /var/www/itmade \
  /etc/nginx/sites-available/itmade
```

## Résumé des Ports et Services

- **Port 3000** : API Node.js (local seulement)
- **Port 80/443** : Nginx (public)
- **EmailJS** : Service externe sécurisé
- **PM2** : Gestion des processus Node.js

🚀 **Votre API sécurisée est maintenant prête !**