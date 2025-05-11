const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully.',
        data:newMessage
     });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};