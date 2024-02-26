const express = require('express');
const router = express.Router();
const base = require('../controllers/base');

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/', base.buildHome);
module.exports = router;