const express = require('express');
const router = express.Router();

const controller=require('../controllers/controller');

router.get('/test',controller.test);

router.get('/register',controller.register);

router.get('/login',controller.login);

router.get('/addbox',controller.addbox);

module.exports = router;
