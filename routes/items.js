const router = require('express').Router();
const itemsController = require('../controllers/items');
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getSingle);
router.post('/post', requiresAuth(), itemsController.createItem);
router.put('/put/:id', requiresAuth(), itemsController.updateItem);
router.delete('/delete/:id', requiresAuth(), itemsController.deleteItem);

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }
 
    next(err, req, res);
});
module.exports = router;