const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'pkong89@gmail.com',
    subject: 'Welcome',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'pkong89@gmail.com',
    subject: 'Cancellation',
    text: `We are sorry to see you go, ${name}. Please let us know how we can improve`,
  });
};

module.exports = { sendWelcomeEmail, sendCancelEmail };
