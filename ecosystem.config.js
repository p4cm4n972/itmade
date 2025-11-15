module.exports = {
  apps: [
    {
      name: 'itmade',
      script: 'dist/itmade/server/server.mjs', // <- adapte ce chemin si besoin
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        API_BASE_URL: process.env.API_BASE_URL,
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
      },
    },
  ],
};
