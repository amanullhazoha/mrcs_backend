const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.mrcsaid.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@mrcsaid.com",
    pass: "Surgeon2023#",
  },
});

const contactUs = async (req, res) => {
  const { email, full_name, message, phone } = req.body;

  try {
    const mailOptions = {
      from: "contact@mrcsaid.com",
      to: "contact@mrcsaid.com",
      subject: "Send a contact message",
      text: `<div>
        <h1>Name: ${full_name}</h1>
        <h1>Email: ${email}</h1>
        <h1>Phone: ${phone}</h1>
        <p>Message: ${message}</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Failed to send reset email");
      } else {
        console.log("Email sent : " + info.response);
        res.status(200).send(`Password reset email sent ${info.response}`);
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
