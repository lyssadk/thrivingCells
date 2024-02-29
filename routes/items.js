const router = require('express').Router();
const itemsController = require('../controllers/items');

router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getSingle);

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }
 
    next(err, req, res);
});
module.exports = router;