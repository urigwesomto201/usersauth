const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');

router.post('/messages', createMessage);

module.exports = router;