const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/food.js')
const usersController = require('./controllers/users.js')

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
