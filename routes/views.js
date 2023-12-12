const express = require('express');
const router = express.Router();

// Add endpoint 
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ date: new Date(), status: 'OK' });
  });

  module.exports = router;