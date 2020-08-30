const nodemailer = require('nodemailer');

nodemailer.createTestAccount().then((testAccount) => {
  console.log(testAccount);
});
