const express = require('express');
require('dotenv').config();  // Make sure environment variables are loaded
require('./config/database');
const PORT = process.env.PORT || 2030;
const userRouter = require('./routes/userRouter');
const app = express();
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
  