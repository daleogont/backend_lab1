const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

const users = [];
const categories = [];
const records = [];


router.post('/user', (req,res) =>{
  const { user_name } = req.body;

  if (!user_name){
      return res.status(400).json({message: 'username section can not be empty'})
  }

 const user_id = uuidv4();
 const message1 = "User successfuly created";

  const user = {
      user_id,
      user_name,
      message1

  };
  users.push(user);

  res.status(201).json(user);
});

router.get('/users', (req, res) => {
  res.status(200).json(users)
});

router.get('/user/:user_id', (req, res) => {
  const uId = req.params.user_id;

  const curUser = users.find(user => user.user_id === uId);

  if (!curUser){
      return res.status(404).json({message: 'user_id is invalid'})
  }
  res.status(200).json(curUser);
});

router.delete('/user/:user_id', (req, res) => {
  const uId = req.params.user_id;

  const curUser = users.find(user => user.user_id === String(uId));

  if (!curUser){
      return res.status(404).json({message: 'user_id is invalid '})
  }

  const delU = users.splice(curUser, 1)[0];

  res.status(200).json(delU);
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
