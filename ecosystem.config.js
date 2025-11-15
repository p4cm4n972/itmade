module.exports = {
  apps: [
    {
      name: 'itmade-ssr',                              // 👈 nom clair
      cwd: '/var/www/itmade/itmade',                  // 👈 dossier du projet
      script: 'dist/itmade/server/server.mjs',        // 👈 mets EXACTEMENT le fichier qui marche avec `node`
      instances: 1,
      exec_mode: 'fork',
      interpreter: 'node',                            // ou '/usr/bin/node' si besoin
      env: {
        NODE_ENV: 'production',
        PORT: 4001, // 👈 port dédié itmade.fr, à aligner avec Nginx
        API_BASE_URL: process.env.API_BASE_URL || 'http://127.0.0.1:3000',
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
      },
    },
  ],
};
