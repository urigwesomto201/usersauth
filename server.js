const express = require('express');
require('dotenv').config();  // Make sure environment variables are loaded
require('./config/database');
const cors = require('cors');

const PORT = process.env.PORT || 2030;
const userRouter = require('./routes/userRouter');
const messageRoutes = require('./routes/messageRoutes')
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
  