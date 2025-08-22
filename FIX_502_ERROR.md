# Fix Erreur 502 Bad Gateway

## 🔍 Diagnostic de l'erreur 502

L'erreur 502 signifie que Nginx ne peut pas joindre votre API sur le port 3001.

## Étape 1: Vérifier que l'API fonctionne

```bash
# Vérifier les processus PM2
pm2 status

# Vérifier les logs de l'API
pm2 logs itmade-contact --lines 20

# Tester l'API directement
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}'
```

## Étape 2: Vérifier la configuration Nginx

```bash
# Tester la config Nginx
sudo nginx -t

# Voir les logs d'erreur Nginx
sudo tail -20 /var/log/nginx/itmade-error.log
```

## Problème probable: Route incorrecte

Je vois dans le code que la route a été modifiée. Voici la correction :

### Dans server/routes/contact.js
La route devrait être :
```javascript
router.post('/send-email', async (req, res) => {
  // ... code
});
```

**PAS** :
```javascript
router.post('/contact/send-email', async (req, res) => {
```

## Solution complète

### 1. Corriger le fichier contact.js
```bash
nano /var/www/html/itmade/itmade/server/routes/contact.js
```

**Changer la ligne 53 de :**
```javascript
router.post('/contact/send-email', async (req, res) => {
```

**En :**
```javascript
router.post('/send-email', async (req, res) => {
```

### 2. Corriger la configuration Nginx
```bash
sudo nano /etc/nginx/sites-available/itmade
```

**S'assurer que la configuration est :**
```nginx
location /api/contact {
    proxy_pass http://localhost:3001/api;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Timeout
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

### 3. Redémarrer les services
```bash
# Redémarrer l'API
pm2 restart itmade-contact

# Recharger Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## Étape 3: Test de fonctionnement

### Test local de l'API
```bash
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Local","email":"test@test.com","subject":"Test","message":"Test local API"}'
```

**Réponse attendue :**
```json
{"success":true,"message":"Email envoyé avec succès!"}
```

### Test via Nginx
```bash
curl -X POST https://itmade.fr/api/contact/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Nginx","email":"test@test.com","subject":"Test","message":"Test via Nginx"}'
```

## Étape 4: Vérifications supplémentaires

### Vérifier que le port 3001 est ouvert
```bash
# Vérifier que l'API écoute sur le port 3001
sudo netstat -tlnp | grep 3001
# ou
sudo ss -tlnp | grep 3001
```

**Vous devriez voir :**
```
tcp    0    0    :::3001    :::*    LISTEN    1234/node
```

### Vérifier les variables d'environnement
```bash
# Voir les variables d'environnement de PM2
pm2 env itmade-contact
```

### Si l'API ne démarre pas
```bash
# Arrêter PM2
pm2 stop itmade-contact

# Démarrer manuellement pour voir les erreurs
cd /var/www/html/itmade/itmade/server
node server.js
```

## Étape 5: Configuration complète working

### Fichier server/routes/contact.js (ligne 53)
```javascript
router.post('/send-email', async (req, res) => {
```

### Configuration Nginx
```nginx
location /api/contact {
    proxy_pass http://localhost:3001/api;
    # ... autres headers
}
```

### URL Angular (contact.ts ligne 133)
```typescript
'/api/contact/send-email'
```

## Flow complet des URLs

1. **Frontend** : `/api/contact/send-email`
2. **Nginx** : `/api/contact` → `http://localhost:3001/api`
3. **Express** : `/api` + `/send-email` = `/api/send-email`
4. **Router** : `.post('/send-email', ...)`

## Commandes de debug

```bash
# Logs en temps réel
pm2 logs itmade-contact --lines 0

# Logs Nginx en temps réel
sudo tail -f /var/log/nginx/itmade-error.log

# Processus qui écoutent
sudo netstat -tlnp | grep :3001
```

Suivez ces étapes dans l'ordre et l'erreur 502 devrait disparaître ! 🔧