const express = require('express');
const ctrl = require('../../controllers/auth.controller');
const authJwt = require('../../middlewares/authJwt');
const validator = require('../../validators/auth.validator.js');
 
const router = express.Router();
router.post('/register', validator.registro, ctrl.register);
router.post('/login', validator.login, ctrl.login);
router.get('/me', authJwt, ctrl.me);
 
module.exports = router;
