const nodemailer = require('nodemailer');
const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Add this line to allow self-signed certs
  }
});

    // Email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Me',
      text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will get back to you shortly.\n\nBest regards,\nYour Name`
    });

    // Email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject:` New Contact Message: ${subject}`,
      replyTo: email,
      text: `You've received a new message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    });

    res.status(201).json({ message: 'Message sent and emails delivered.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};