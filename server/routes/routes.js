const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const controller=require('../controllers/controller');

router.get('/test',controller.test);

router.post('/register',controller.register);

router.post('/login',controller.login);

router.post('/addbox', auth.verifyToken, controller.addbox);

router.post('/getbox',auth.verifyToken, controller.getbox);

router.post('/changebox',auth.verifyToken, controller.changebox);

router.post('/deletebox',auth.verifyToken, controller.deletebox);

router.post('/logout', auth.verifyToken, controller.logout);

router.post('/basicrequest', auth.verifyToken, controller.basicrequest);

router.post('/validcookie', auth.verifyToken, controller.validcookie);

module.exports = router;
