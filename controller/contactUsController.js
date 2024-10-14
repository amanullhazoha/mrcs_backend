const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const contactUs = async (req, res) => {
  const { email, full_name, message, phone, subject } = req.body;

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Send a contact message",
      text: `<div>
        <h1>Name: ${full_name}</h1>
        <h1>Email: ${email}</h1>
        <h1>Phone: ${phone}</h1>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Failed to send contact message");
      } else {
        console.log("Email sent : " + info.response);
        res.status(200).send(`Contact message send ${info.response}`);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  contactUs,
};
