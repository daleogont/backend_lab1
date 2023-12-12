const express = require('express');
const app = express();
const router = require('./routes/views');

app.use(router);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
