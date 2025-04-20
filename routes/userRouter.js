const { register, verifyUser, login } = require('../controllers/usercontroller');
const {registers} = require('../middlewares/validator')

const router = require('express').Router();



router.post('/users',registers,  register);

router.get('/verify-user/:token', verifyUser);

router.post('/login', login);

module.exports = router