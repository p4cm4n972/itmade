import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import * as emailjs from '@emailjs/nodejs';
import * as validator from 'validator';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Configuration EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_x00zprf',
  templateId: 'template_wwdfjou',
  publicKey: 'Oe9QsLVCKgJbT6IFY'
};

// Initialiser EmailJS
emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

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
    
    // Préparation des données pour EmailJS
    const templateParams = {
      from_name: sanitizedData.name,
      from_email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      reply_to: sanitizedData.email,
      timestamp: new Date().toLocaleString('fr-FR'),
      ip_address: req.ip
    };
    
    // Envoi avec EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
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
    
  } catch (error: any) {
    console.error('❌ Erreur détaillée:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.',
      details: process.env['NODE_ENV'] === 'development' ? error.message : undefined
    });
  }
});

// Route de test pour vérifier la configuration
app.get('/api/contact/health', (req, res): void => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    emailjs_configured: !!(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey)
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
