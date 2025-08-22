# Alternatives Sécurisées pour l'Envoi d'Emails

## Problème avec EmailJS
- ❌ Clés API visibles dans le code source
- ❌ Pas de validation serveur
- ❌ Vulnérable au spam/abuse
- ❌ Limite de sécurité pour un site professionnel

## Solutions Sécurisées Recommandées

### 1. **Netlify Forms** (Recommandé - Simple)
**Avantages:** Gratuit, sécurisé, facile à implémenter

#### Configuration :
```html
<!-- Formulaire HTML simple -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
  
  <input type="text" name="name" placeholder="Votre nom" required />
  <input type="email" name="email" placeholder="Votre email" required />
  <input type="text" name="subject" placeholder="Sujet" required />
  <textarea name="message" placeholder="Votre message" required></textarea>
  
  <button type="submit">Envoyer</button>
</form>
```

#### Dans Angular :
```typescript
async onSubmit() {
  const formData = new FormData();
  formData.append('form-name', 'contact');
  formData.append('name', this.formData.name);
  formData.append('email', this.formData.email);
  formData.append('subject', this.formData.subject);
  formData.append('message', this.formData.message);

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    });

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

### 2. **Formspree** (Facile)
**Avantages:** Gratuit (50 soumissions/mois), sécurisé, anti-spam

```typescript
async onSubmit() {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.formData.name,
        email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message
      })
    });

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

### 3. **API Backend Node.js + Nodemailer** (Le plus sécurisé)

#### Backend API (Express + Nodemailer) :
```javascript
// server/api/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Variables d'environnement
    pass: process.env.EMAIL_PASS  // Mot de passe d'application
  }
});

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'manuel.adele@gmail.com',
      replyTo: email,
      subject: `Contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <div style="background:#f5f5f5;padding:20px;border-radius:5px;">
          <strong>Message:</strong><br>
          ${message}
        </div>
      `
    });

    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
});

module.exports = router;
```

#### Frontend Angular :
```typescript
async onSubmit() {
  try {
    const response = await fetch('/api/contact', {
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
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    this.statusMessage = 'Erreur lors de l\'envoi';
    this.statusClass = 'error';
  }
}
```

### 4. **Vercel Functions** (Serverless)
```javascript
// api/contact.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'manuel.adele@gmail.com',
      replyTo: email,
      subject: `Contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
}
```

## Recommandation

**Pour ITMade, je recommande :**

1. **Court terme :** Netlify Forms (gratuit, sécurisé, zero config)
2. **Long terme :** API Node.js + Nodemailer (contrôle total, très sécurisé)

Voulez-vous que j'implémente une de ces solutions ?