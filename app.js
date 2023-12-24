
const express = require('express');
const app = express();
const router = require('./routes/views');

app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  const currentDate = new Date();
  const status = 'success';

  const response = {
    date: currentDate,
    status: status,
    message: 'hello from back-end', 
  };

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
