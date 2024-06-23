const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);

module.exports = router;