const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const controller=require('../controllers/controller');

router.get('/api/test',controller.test);

router.post('/api/register',controller.register);

router.post('/api/login',controller.login);

router.post('/api/addbox', auth.verifyToken, controller.addbox);

router.post('/api/getbox',auth.verifyToken, controller.getbox);

router.post('/api/changebox',auth.verifyToken, controller.changebox);

router.post('/api/deletebox',auth.verifyToken, controller.deletebox);

router.post('/api/logout', auth.verifyToken, controller.logout);

router.post('/api/basicrequest', auth.verifyToken, controller.basicrequest);

router.post('/api/validcookie', auth.verifyToken, controller.validcookie);

module.exports = router;
