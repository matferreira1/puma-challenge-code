const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/user/:name', controller.searchUserGitHub);

module.exports = router;