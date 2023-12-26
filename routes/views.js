const express = require('express');
const {v4: uuidv4} = require('uuid');
const {sequelize} = require('sequelize');
const router = express.Router();

const {User} = require('../models/index');
const {Category} = require('../models/index');
const {Record} = require('../models/index');

router.post('/user', async (req, res) => {
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
router.post('/category', async (req, res) => {
  try {
    const { cat_name } = req.body;

    const validationResult = categoryPostSchema.validate({ cat_name });

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
  }

    
    const category = await Category.create({
      cat_name,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Failure creating category:', error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});

router.get('/categories', async (req, res) => {
  
  try {
    const categories = await Category.findAll();

    res.status(200).json(categories);
  } catch (error) {
    console.error('Failure fetching categories:', error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});

router.get('/category/:cat_id', async (req, res) => {
  const cId = req.params.cat_id;

  const validationResult = categoryGetSchema.validate({ cat_id });

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
  }

  try {
    const curCat = await Category.findByPk(cId);

    if (!curCat) {
      return res.status(404).json({ error: 'Invalid cat_id' });
    }

    res.status(200).json(curCat);
  } catch (error) {
    console.error(`Error fetching category with cat_id ${cId}:`, error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});

router.delete('/category/:cat_id', async (req, res) => {
  const cId = req.params.cat_id;

  const validationResult = categoryGetSchema.validate({ cat_id });

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message });
  }

  try {
    const deletedCategory = await Category.findByPk(cId);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Invalid cat_id' });
    }

    await deletedCategory.destroy();

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error(`Failure deleting category with cat_id ${cId}:`, error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});


//>>>>>>>>>>>>>>>>3>>>>>>>>>>>>>>>//
router.post('/record', async (req, res) => {
  const { user_id, cat_id, amount } = req.body;

  const validationResult = recordSchema.validate({ user_id, cat_id, amount });

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.details[0].message });
  }

  try {
    const user = await User.findByPk(user_id);
    const category = await Category.findByPk(cat_id);

    if (!user || !category) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const record = await Record.create({
      user_id,
      cat_id,
      amount,
    });

    const wallet = await Wallet.findOne({
      where: { user_id },
    });

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet not found' });
    }

    wallet.balance -= amount;
    await wallet.save();

    res.status(201).json(record);
  } catch (error) {
    console.error('Failure creating record:', error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});


router.get('/records', async (req, res) => {
    
  try {
    const records = await Record.findAll();

    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});

router.get('/record', async (req, res) => {
  const { user_id, cat_id } = req.query;

  try {

    const whereClause = {};
    if (user_id) { 
      whereClause.user_id = user_id; 
    }
    if (cat_id) { 
      whereClause.cat_id = cat_id; 
    }

    const filteredRecords = await Record.findAll({
      where: whereClause,
    });

    res.status(200).json(filteredRecords);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Server Malfunction' });
  }
});

  router.delete('/record/:rec_id', async (req, res) => {
    const rec_id = req.params.rec_id;
  
    try {
      
      const deletedRecord = await Record.findByPk(rec_id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Invalid rec_id' });
      }
  
      await deletedRecord.destroy();
  
      res.status(200).json(deletedRecord);
    } catch (error) {
      console.error(`Error deleting record with rec_id ${rec}:`, error);
      res.status(500).json({ error: 'Server Malfunction' });
    }
  });

//>>>>>>>>>>>>>>>>End>>>>>>>>>>>>>>>//

//>>>>>>>>>>>>>>>>>>2>>>>>>>>>>>>>//
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
