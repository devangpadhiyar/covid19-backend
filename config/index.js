module.exports = {
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  PLOTLY_USERNAME: process.env.PLOTLY_USERNAME,
  PLOTLY_API_KEY: process.env.PLOTLY_API_KEY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
};
