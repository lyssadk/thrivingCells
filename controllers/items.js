const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

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
    const result = await mongodb.getDb().db().collection('Items').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };


const createItem = async (req, res) => {
  const item = {
    name: req.body.name,
    quantity: req.body.quantity,
    wholesale: req.body.wholesale,
  };
  const response = await mongodb.getDb().db().collection('Items').insertOne(item);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const item = {
    name: req.body.name,
    quantity: req.body.quantity,
    wholesale: req.body.wholesale,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Items')
    .updateOne({ _id: userId }, item);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteItem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('Items').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createItem,
  updateItem,
  deleteItem
};

