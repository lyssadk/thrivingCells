const express = require('express');
const router = express.Router();
const base = require('../controllers/base');

router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/', base.buildHome);
router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }
 
    next(err, req, res);
});
module.exports = router;