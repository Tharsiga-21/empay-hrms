require('dotenv').config();
const nodemailer = require('nodemailer');

const test = async () => {
  console.log('🔍 Starting SMTP Diagnostic...');
  console.log('---------------------------');
  console.log(`Host: ${process.env.SMTP_HOST}`);
  console.log(`User: ${process.env.SMTP_USER}`);
  console.log(`Port: ${process.env.SMTP_PORT}`);
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Error: SMTP_USER or SMTP_PASS is missing in .env');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    console.log('⏳ Verifying connection to Gmail...');
    await transporter.verify();
    console.log('✅ Connection verified! SMTP credentials are correct.');

    console.log('⏳ Attempting to send test email to participationcorner2025@gmail.com...');
    const info = await transporter.sendMail({
      from: `"EmPay HRMS Test" <${process.env.SMTP_USER}>`,
      to: 'participationcorner2025@gmail.com',
      subject: 'SMTP Diagnostic Test 📧',
      text: 'If you see this, your SMTP configuration is working perfectly!',
      html: '<h2>SMTP Diagnostic Test 📧</h2><p>If you see this, your SMTP configuration is working perfectly!</p>'
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('---------------------------');
    console.log('SUCCESS: SMTP is fully functional.');
  } catch (error) {
    console.error('❌ SMTP Diagnostic Failed!');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.log('---------------------------');
    console.log('TIPS:');
    if (error.message.includes('Invalid login')) {
      console.log('👉 Ensure you are using a 16-character APP PASSWORD, not your regular Gmail password.');
      console.log('👉 Double-check that your SMTP_USER matches your Gmail address.');
    }
    process.exit(1);
  }
};

test();
