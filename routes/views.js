const express = require('express');
const {v4: uuidv4} = require('uuid');
const {sequelize} = require('sequelize');
const router = express.Router();

const {User} = require('../models/index');
const {Category} = require('../models/index');

outer.post('/user', async (req, res) => {
  const { user_name } = req.body;

  const validationResult = userPostSchema.validate({ user_name });

  if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
  }

  try {
      const user = await User.create({ user_name });
      res.status(201).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Malfunction' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Malfunction' });
  }
});


router.get('/user/:user_id', async (req, res) => {
  const uId = req.params.user_id;

  const validationResult = userGetSchema.validate({ uId });

      if (validationResult.error) {
          return res.status(400).json({ message: validationResult.error.details[0].message });
      }


  try {
      const curUser = await User.findByPk(uId);

      if (!curUser) {
          return res.status(404).json({ message: 'invalid user_id' });
      }

      res.status(200).json(curUser);
  } catch (error) {
      console.error(`Error fetching user with user_id ${uId}:`, error);
      res.status(500).json({ message: 'Server Malfunction' });
  }
});

router.delete('/user/:user_id', async (req, res) => {
  const uId = req.params.user_id;

  const validationResult = userGetSchema.validate({ uId });

  if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
  }

  try {
    const deletedUser = await User.findByPk(uId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Invalid user_id' });
    }

    await deletedUser.destroy();

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(`Error with deleting user and user_id ${uId}:`, error);
    res.status(500).json({ message: 'Server Malfunction' });
  }
});
//>>>>>>>>>>>>>>>>>>2>>>>>>>>>>>>>//

router.post('/category', (req, res) => {
  const {cat_name} = req.body;

  if (!cat_name){
      return res.status(400).json({error: 'category_name section can not be empty'})
  }

  const cat_id = uuidv4();
  const message2 = "Category successfuly created";

  const category = {
      cat_id,
      cat_name,
      message2
  };
  categories.push(category);

  res.status(201).json(category);
});

router.get('/categories', (req, res) => {
  res.status(200).json(categories)
});

router.get('/category/:cat_id', (req, res) =>{
  const cId = req.params.cat_id;

  const curCat = categories.find(category => category.cat_id === cId);

  if (!curCat){
      return res.status(404).json({error: 'cat_id is invalid'})
  }
  res.status(200).json(curCat);
});

router.delete('/category/:cat_id', (req, res) => {
  const cId = req.params.cat_id;

  const curCat = categories.find(category => category.cat_id === cId);

  if (!curCat){
      return res.status(404).json({error: 'cat_id is invalid'})
  }

  const delC = categories.splice(curCat, 1)[0];

  res.status(200).json(delC);
});

//>>>>>>>>>>>>>>>>3>>>>>>>>>>>>>>>//

router.post('/record', (req, res) => {
  const { uId, cId, amount } = req.body;

  const userExists = users.some(user => user.user_id === uId);
  const categoryExists = categories.some(category => category.cat_id === cId);

  if (!userExists || !categoryExists) {
    return res.status(400).json({ error: 'Invalid user_id or cat_id' });
  }

  const rec_id = uuidv4();
  const record = { rec_id, uId, cId, amount };
  records.push(record);

  res.status(201).json(record);
});

router.get('/records', (req, res) => {
  res.status(200).json(records);
});

router.get('/record', (req, res) => {
  const { uId, cId } = req.query;

  const filteredRecords = records.filter(record =>
    (!uId || record.uId === uId) &&
    (!cId || record.cId === cId)
  );

  res.status(200).json(filteredRecords);
});

router.delete('/record/:rec_id', (req, res) => {
  const { rec_id } = req.params;
  const index = records.findIndex(record => record.rec_id === rec_id);

  if (index === -1) {
    return res.status(404).json({ error: 'rec_id is invalid' });
  }

  const deletedRecord = records.splice(index, 1)[0];
  res.status(200).json(deletedRecord);
});

//>>>>>>>>>>>>>>>>End>>>>>>>>>>>>>>>//


router.get('/healthcheck', (req, res) => {
 
  const currentDate = new Date();
  const status = 'success';

  
  const response = {
    date: currentDate,
    status: status,
  };

  
  res.status(200).json(response);
});

module.exports = router;
