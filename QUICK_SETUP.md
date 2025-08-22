# Setup Rapide - API Email Sécurisée

## 🚀 Étapes de Déploiement (5 minutes)

### 1. Sur votre VPS Ubuntu
```bash
# 1. Aller dans le dossier web
cd /var/www/itmade

# 2. Copier les fichiers server/
# (Transférer le dossier server/ depuis votre local vers le VPS)

# 3. Installer les dépendances
cd server
npm install

# 4. Créer le fichier .env
nano .env
```

### 2. Contenu du fichier .env
```env
EMAILJS_SERVICE_ID=service_x00zprf
EMAILJS_TEMPLATE_ID=template_wwdfjou
EMAILJS_PUBLIC_KEY=Oe9QsLVCKgJbT6IFY
NODE_ENV=production
PORT=3000
```

### 3. Build Angular et démarrage
```bash
# Build Angular
cd /var/www/itmade
npm run build

# Démarrer l'API
cd server
pm2 start server.js --name itmade-api
pm2 save
```

### 4. Configuration Nginx (ajouter cette section)
```nginx
# Dans /etc/nginx/sites-available/itmade
location /api {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### 5. Redémarrer Nginx
```bash
sudo systemctl reload nginx
```

## ✅ Test
Visitez votre site et testez le formulaire de contact !

## 🔧 Debugging
```bash
# Voir les logs
pm2 logs itmade-api

# Redémarrer si nécessaire
pm2 restart itmade-api
```

---

**🛡️ Sécurité :** Plus de clés exposées ! Tout est sécurisé côté serveur.