const apiInstance = require('../config/emailConfig');
const Brevo = require('@getbrevo/brevo');
require('dotenv').config();

const sendInquiryEmail = async (data) => {
    const { name, email, phone, productInterest, message } = data;

    // Create email using Brevo's SendSmtpEmail model
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `New Inquiry from ${name} - ${productInterest}`;
    sendSmtpEmail.htmlContent = `
        <h2>New Web Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Product Interest:</strong> ${productInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
    sendSmtpEmail.sender = {
        name: "Website Inquiry",
        email: process.env.EMAIL_USER
    };
    sendSmtpEmail.to = [{ email: process.env.ADMIN_EMAIL }];
    sendSmtpEmail.replyTo = { email: email, name: name };

    try {
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully via Brevo API:', result);
        return result;
    } catch (error) {
        console.error('Error sending email via Brevo API:', error);
        throw error;
    }
};

module.exports = { sendInquiryEmail };
