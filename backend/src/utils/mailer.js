const nodemailer = require('nodemailer');

// We use an ethereal test account for local development so we don't spam real emails.
let transporter;

const initMailer = async () => {
  if (process.env.NODE_ENV === 'production') {
    // Setup real SMTP here later if needed
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('📧 Ethereal email ready. Use the returned URL to preview sent emails.');
  }
};

initMailer().catch(console.error);

const sendEmail = async (to, subject, text, html = '') => {
  if (!transporter) await initMailer();
  
  const info = await transporter.sendMail({
    from: '"EmPay HRMS" <no-reply@empay.local>',
    to,
    subject,
    text,
    html: html || text
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log(`✉️ Message sent: ${info.messageId}`);
    console.log(`🔗 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
  return info;
};

module.exports = { sendEmail };
