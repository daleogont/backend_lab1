const express = require('express');
const router = express.Router();


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
