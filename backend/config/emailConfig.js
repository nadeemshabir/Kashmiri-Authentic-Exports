const Brevo = require('@getbrevo/brevo');
require('dotenv').config();

// Initialize Brevo API client
const apiInstance = new Brevo.TransactionalEmailsApi();

// Set API key authentication
apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

console.log('Brevo API client initialized');

module.exports = apiInstance;
