# Configuration EmailJS pour le formulaire de contact

## 1. Créer un compte EmailJS

1. Rendez-vous sur [EmailJS](https://emailjs.com)
2. Créez un compte gratuit
3. Notez votre **User ID** (Public Key)

## 2. Configuration du service d'email

1. Dans votre tableau de bord EmailJS, allez dans **Email Services**
2. Ajoutez un service (Gmail, Outlook, etc.)
3. Notez le **Service ID**

## 3. Création du template d'email

1. Allez dans **Email Templates**
2. Créez un nouveau template avec le contenu suivant :

```
Nouveau message de contact - ITMade

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis le formulaire de contact ITMade
```

3. Notez le **Template ID**

## 4. Configuration dans le code

Modifiez les constantes dans `contact.ts`:

```typescript
private readonly EMAIL_SERVICE_ID = 'votre_service_id';
private readonly EMAIL_TEMPLATE_ID = 'votre_template_id';
private readonly EMAIL_PUBLIC_KEY = 'votre_public_key';
```

## 5. Variables du template

Le template utilise ces variables :
- `{{from_name}}` - Nom du contact
- `{{from_email}}` - Email du contact
- `{{subject}}` - Sujet du message
- `{{message}}` - Message du contact
- `{{to_email}}` - Votre email (défini dans le code)

## 6. Test

1. Lancez l'application : `npm start`
2. Naviguez vers le formulaire de contact
3. Remplissez et soumettez le formulaire
4. Vérifiez votre boîte email

## 7. Limites du plan gratuit

- 200 emails/mois
- Parfait pour un site vitrine

## 8. Alternative : Service backend

Si vous préférez un service backend, vous pouvez :
- Utiliser Netlify Forms
- Créer une API avec Node.js + Nodemailer
- Utiliser Formspree ou similaire