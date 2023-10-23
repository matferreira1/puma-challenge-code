const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/users/:name', controller.create);
router.get('/users/', controller.getFavorites);
router.delete('/users/:username', controller.deleteUser)
module.exports = router;