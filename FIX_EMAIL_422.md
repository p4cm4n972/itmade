# Résolution Erreur 422 - EmailJS

## Problème
L'erreur 422 "recipients address is empty" indique que l'email de destination n'est pas configuré.

## Solution : Configuration dans EmailJS Dashboard

### 1. Vérifier la configuration du Service Email

1. **Allez dans EmailJS Dashboard > Email Services**
2. **Sélectionnez votre service** (`service_x00zprf`)
3. **Vérifiez que l'email est bien configuré**

### 2. Configuration du Template Email

1. **Allez dans Email Templates**
2. **Éditez votre template** (`template_wwdfjou`)
3. **Dans les Settings du template :**

#### Option A : Email fixe dans le template
```
To Email: manuel.adele@gmail.com
```

#### Option B : Utiliser une variable (recommandé)
Dans le template, ajoutez :
```
To Email: {{to_email}}
```

Puis dans le code, remettez :
```typescript
const templateParams = {
  from_name: this.formData.name,
  from_email: this.formData.email,
  subject: this.formData.subject,
  message: this.formData.message,
  to_email: 'manuel.adele@gmail.com' // ← Cette ligne
};
```

### 3. Template EmailJS corrigé

Utilisez ce template dans EmailJS :

**Subject:**
```
Nouveau message de {{from_name}} - {{subject}}
```

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #1976d2;">Nouveau message de contact</h2>
    
    <p><strong>Nom:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Sujet:</strong> {{subject}}</p>
    
    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
        <strong>Message:</strong><br>
        {{message}}
    </div>
    
    <hr>
    <p style="font-size: 12px; color: #666;">
        Envoyé depuis le formulaire de contact ITMade.fr<br>
        Répondre à: {{reply_to}}
    </p>
</div>
```

### 4. Configuration du Service

**Important:** Assurez-vous que dans votre service EmailJS :

1. **L'email de destination est configuré**
2. **Le service est bien connecté à votre compte email**
3. **Les autorisations sont accordées**

### 5. Test de validation

Pour tester, utilisez cette configuration simple dans le template :

**To Email (dans les settings du template):**
```
manuel.adele@gmail.com
```

**Et supprimez la variable `to_email` du code temporairement.**

### 6. Variables template recommandées

```javascript
const templateParams = {
  from_name: this.formData.name,
  from_email: this.formData.email, 
  subject: this.formData.subject,
  message: this.formData.message,
  reply_to: this.formData.email
};
```

## Vérifications finales

1. ✅ Service EmailJS connecté
2. ✅ Template créé avec email de destination
3. ✅ Variables correctes dans le code
4. ✅ Public Key et Service ID corrects

Après ces modifications, l'erreur 422 devrait être résolue !