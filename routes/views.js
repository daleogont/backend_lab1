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
      return res.status(404).json({message: 'user_id is valid'})
  }
  res.status(200).json(curUser);
});

router.delete('/user/:user_id', (req, res) => {
  const uId = req.params.user_id;

  const curUser = users.find(user => user.user_id === String(uId));

  if (!curUser){
      return res.status(404).json({message: 'user_id is valid '})
  }

  const delU = users.splice(curUser, 1)[0];

  res.status(200).json(delU);
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post('/category', (req, res) => {
  const {cat_name} = req.body;

  if (!cat_name){
      return res.status(400).json({error: 'Name is required'})
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
      return res.status(404).json({error: 'No category with such cat_id'})
  }
  res.status(200).json(curCat);
});

router.delete('/category/:cat_id', (req, res) => {
  const cId = req.params.cat_id;

  const curCat = categories.find(category => category.cat_id === cId);

  if (!curCat){
      return res.status(404).json({error: 'No category with such cat_id'})
  }

  const delC = categories.splice(curCat, 1)[0];

  res.status(200).json(delC);
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//




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
