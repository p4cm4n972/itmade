import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import * as validator from 'validator';
import * as nodemailer from 'nodemailer';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Configuration Email avec Nodemailer
const EMAIL_CONFIG = {
  host: 'smtp-relay.brevo.com',
  port: 587,
  user: '8af8cf001@smtp-brevo.com', 
  password: 'xsmtpsib-ae6e52770cf5f4794ee7a9c34add40b71f1f532175f914089e614aff226d7acc-m9',
  from: 'no-reply@verstack.io',
  to: 'manuel.adele@gmail.com'
};

// Créer le transporteur Nodemailer
const transporter = nodemailer.createTransporter({
  host: EMAIL_CONFIG.host,
  port: EMAIL_CONFIG.port,
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.password
  }
});

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * API Contact - Envoi d'emails sécurisé avec EmailJS
 */

// Fonction de validation
function validateContactData(data: any) {
  const errors: string[] = [];
  
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
  
  return errors;
}

// Fonction de sanitization
function sanitizeData(data: any) {
  return {
    name: validator.escape(data.name.trim()),
    email: validator.normalizeEmail(data.email.trim()) || '',
    subject: validator.escape(data.subject.trim()),
    message: validator.escape(data.message.trim())
  };
}

// Route API Contact
app.post('/api/contact/send-email', async (req:any, res: any): Promise<void> => {
  try {
    console.log(`📧 Tentative d'envoi email depuis IP: ${req.ip}`);
    console.log('Body reçu:', req.body);
    
    // Validation des données
    const errors = validateContactData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }
    
    // Protection anti-spam basique
    const spamKeywords = ['viagra', 'casino', 'lottery'];
    const text = `${req.body.name} ${req.body.subject} ${req.body.message}`.toLowerCase();
    if (spamKeywords.some(keyword => text.includes(keyword))) {
      console.log('🚨 Tentative de spam détectée');
      return res.status(400).json({
        success: false,
        error: 'Contenu non autorisé détecté'
      });
    }
    
    // Sanitization des données
    const sanitizedData = sanitizeData(req.body);
    console.log('Données sanitized:', sanitizedData);
    
    // Préparer l'email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Nouveau message de contact - ITMade</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Nom:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Sujet:</strong> ${sanitizedData.subject}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <p><strong>IP:</strong> ${req.ip}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-left: 4px solid #1976d2; margin: 20px 0;">
          <h3>Message:</h3>
          <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <hr>
        <p style="font-size: 12px; color: #666; text-align: center;">
          Envoyé depuis le formulaire de contact ITMade.fr
        </p>
      </div>
    `;
    
    // Configuration de l'email
    const mailOptions = {
      from: `"${sanitizedData.name}" <${EMAIL_CONFIG.from}>`,
      to: EMAIL_CONFIG.to,
      replyTo: sanitizedData.email,
      subject: `Contact ITMade: ${sanitizedData.subject}`,
      html: emailHtml,
      text: `
        Nouveau message de contact ITMade
        
        Nom: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Sujet: ${sanitizedData.subject}
        Date: ${new Date().toLocaleString('fr-FR')}
        IP: ${req.ip}
        
        Message:
        ${sanitizedData.message}
        
        ---
        Envoyé depuis le formulaire de contact ITMade.fr
      `
    };
    
    // Envoi avec Nodemailer
    console.log('Tentative d\'envoi avec Nodemailer...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email envoyé:', info.messageId);
    console.log('✅ Email envoyé avec succès');
    
    res.json({
      success: true,
      message: 'Email envoyé avec succès!'
    });
    
  } catch (error: any) {
    console.error('❌ Erreur complète:', error);
    console.error('❌ Type d\'erreur:', typeof error);
    console.error('❌ Erreur détaillée:', {
      message: error?.message || 'Message non disponible',
      stack: error?.stack || 'Stack non disponible',
      name: error?.name || 'Nom non disponible',
      fullError: error
    });
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.',
      details: process.env['NODE_ENV'] === 'development' ? (error?.message || 'Erreur inconnue') : undefined
    });
  }
});

// Route de test pour vérifier la configuration
app.get('/api/contact/health', (_req, res): void => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    email_configured: !!(EMAIL_CONFIG.host && EMAIL_CONFIG.user && EMAIL_CONFIG.password),
    email_config: {
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      user: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.to
    }
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4001;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
