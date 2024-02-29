const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }
 
    next(err, req, res);
});
module.exports = router;