const express = require('express');
const emailjs = require('@emailjs/nodejs');
const validator = require('validator');
const router = express.Router();

// Validation des données
function validateContactData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }
  
  if (!data.email || !validator.isEmail(data.email)) {
    errors.push('Email invalide');
  }
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Le sujet doit contenir au moins 3 caractères');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }
  
  // Validation longueur maximale
  if (data.name && data.name.length > 100) errors.push('Nom trop long');
  if (data.subject && data.subject.length > 200) errors.push('Sujet trop long');
  if (data.message && data.message.length > 2000) errors.push('Message trop long');
  
  return errors;
}

// Protection contre le spam
function isSpam(data) {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'prize', 'click here'];
  const text = `${data.name} ${data.subject} ${data.message}`.toLowerCase();
  
  return spamKeywords.some(keyword => text.includes(keyword));
}

// Sanitization des données
function sanitizeData(data) {
  return {
    name: validator.escape(data.name.trim()),
    email: validator.normalizeEmail(data.email.trim()),
    subject: validator.escape(data.subject.trim()),
    message: validator.escape(data.message.trim())
  };
}

// Endpoint sécurisé pour l'envoi d'emails
router.post('/contact/send-email', async (req, res) => {
  try {
    // Log de la tentative (sans données sensibles)
    console.log(`📧 Tentative d'envoi email depuis IP: ${req.ip}`);
    
    // Validation des données
    const errors = validateContactData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }
    
    // Protection anti-spam
    if (isSpam(req.body)) {
      console.log('🚨 Tentative de spam détectée');
      return res.status(400).json({
        success: false,
        error: 'Contenu non autorisé détecté'
      });
    }
    
    // Sanitization
    const sanitizedData = sanitizeData(req.body);
    
    // Vérification de la configuration EmailJS
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY) {
      console.error('❌ Configuration EmailJS manquante');
      return res.status(500).json({
        success: false,
        error: 'Configuration du serveur manquante'
      });
    }
    
    // Initialisation EmailJS avec la clé privée (côté serveur)
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY, // Plus sécurisé si disponible
    });
    
    // Préparation des données pour EmailJS
    const templateParams = {
      from_name: sanitizedData.name,
      from_email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      reply_to: sanitizedData.email,
      timestamp: new Date().toLocaleString('fr-FR'),
      ip_address: req.ip // Pour le tracking
    };
    
    // Envoi avec EmailJS
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    if (response.status === 200) {
      console.log('✅ Email envoyé avec succès');
      res.json({
        success: true,
        message: 'Email envoyé avec succès!'
      });
    } else {
      throw new Error('Échec de l\'envoi EmailJS');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error.message);
    
    // Ne pas exposer les détails de l'erreur en production
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.'
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message,
        stack: error.stack
      });
    }
  }
});

// Endpoint de test (développement seulement)
if (process.env.NODE_ENV !== 'production') {
  router.get('/test-config', (req, res) => {
    res.json({
      emailjs_configured: !!(process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID),
      service_id: process.env.EMAILJS_SERVICE_ID ? '✅' : '❌',
      template_id: process.env.EMAILJS_TEMPLATE_ID ? '✅' : '❌',
      public_key: process.env.EMAILJS_PUBLIC_KEY ? '✅' : '❌'
    });
  });
}

module.exports = router;