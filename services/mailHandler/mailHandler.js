const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.getTransport = () =>
  nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "brijalkansara091@gmail.com",
      pass: "jtbm klnj eili wfnn",
    },
    logger: true,
    debug: true,
  });

exports.getToken = (email) => {
  const exDate = new Date();
  exDate.setMinutes(new Date().getMinutes() + 5);
  return jwt.sign({ email, exDate }, "Brijal091Key");
};

exports.getMailOptions = (email, credentials) => {
  let body = `<h2>Hey ${email}</h2> <p>You have requested to cerate your product to us. As we have discussed earlier, We are here with your credentials. you can login with this on the following link. we are glad to get you as a part of us.</p> <p>Please Find your Credentials.</p> <p>Email: ${email}<p>password: ${credentials.password}</p></p>
    <p>Link to Redirect: http://localhost:3000</p> <p>Please note that Do not share this credentials with anyone.</p>
    <p>Stay happy, Thank you Regards.</p> <p>Please contact us if you find any difficulties.</p>`;
  return {
    body,
    subject: "Credentials for Login on Your Web",
    to: email,
    html: body,
    from: "brijalkansara091@this.getMailOptions.com",
  };
};
