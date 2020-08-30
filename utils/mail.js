const mailer = require('../config/mailer');

const sendMail = ({
  from,
  to,
  subject,
  text = '',
  html = '',
  attachments = [],
}) => {
  mailer.sendMail(
    { from, to, subject, text, html, attachments },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    }
  );
};

module.exports = { sendMail };
