const mongodb = require('../db/connect');
const utilities = require('../utilities/index')

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('Items').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    return lists
  });
};

const getSingle = async (req, res, next) => {
    const userId = req.params.id;
    const result = await mongodb.getDb().db().collection('items').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

module.exports = {
    getAll,
    getSingle
  };
  