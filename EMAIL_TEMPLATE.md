# Template EmailJS pour ITMade

## Configuration du Template dans EmailJS

1. **Connectez-vous à votre dashboard EmailJS**
2. **Allez dans "Email Templates"**
3. **Cliquez sur "Create New Template"**
4. **Utilisez le template ci-dessous :**

---

## Template Subject (Sujet)
```
Nouveau message de contact - {{subject}}
```

## Template Content (Contenu HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .field strong { color: #1976d2; }
        .message-content { background: white; padding: 20px; border-left: 4px solid #1976d2; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✉️ Nouveau Message de Contact</h1>
            <p>ITMade - Création Sites Web Professionnels</p>
        </div>
        
        <div class="content">
            <div class="field">
                <strong>👤 Nom :</strong> {{from_name}}
            </div>
            
            <div class="field">
                <strong>📧 Email :</strong> {{from_email}}
            </div>
            
            <div class="field">
                <strong>📋 Sujet :</strong> {{subject}}
            </div>
            
            <div class="field">
                <strong>💬 Message :</strong>
                <div class="message-content">
                    {{message}}
                </div>
            </div>
            
            <div class="field">
                <strong>🕐 Date :</strong> {{current_date}}
            </div>
        </div>
        
        <div class="footer">
            <p>Ce message a été envoyé depuis le formulaire de contact du site <strong>ITMade.fr</strong></p>
            <p>Répondre directement à cet email pour contacter le client.</p>
        </div>
    </div>
</body>
</html>
```

## Template Content (Version Texte Simple)
*Alternative si vous préférez un format plus simple :*

```
🌟 NOUVEAU MESSAGE DE CONTACT - ITMADE 🌟

👤 Nom: {{from_name}}
📧 Email: {{from_email}}
📋 Sujet: {{subject}}

💬 Message:
────────────────────────────────
{{message}}
────────────────────────────────

🕐 Reçu le: {{current_date}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Envoyé depuis le formulaire de contact ITMade.fr
Répondre directement à cet email pour contacter le client.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Variables utilisées dans le template

- `{{from_name}}` - Nom du client
- `{{from_email}}` - Email du client
- `{{subject}}` - Sujet du message
- `{{message}}` - Message du client
- `{{current_date}}` - Date automatique (ajouté par EmailJS)

## Configuration Email de Destination

Dans **"Settings" > "To Email"**, configurez :
```
contact@itmade.fr
```

## Template Auto-Reply (Optionnel)

Pour envoyer une confirmation automatique au client :

**Subject:** `Confirmation de réception - ITMade`

**Content:**
```
Bonjour {{from_name}},

Merci pour votre message ! 

Nous avons bien reçu votre demande concernant "{{subject}}" et nous vous répondrons dans les plus brefs délais (généralement sous 24h).

Votre message :
"{{message}}"

À bientôt,
L'équipe ITMade
━━━━━━━━━━━━━━━━━━━━━━━━━
Site Web Professionnel pour TPE & PME
📧 contact@itmade.fr
🌐 itmade.fr
```

---

**Après avoir créé le template, n'oubliez pas de noter le Template ID et de l'ajouter dans votre code !**