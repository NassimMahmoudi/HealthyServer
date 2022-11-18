const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
// serve all static files inside public directory display images
app.use(express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*');
app.get('/jwtid', (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user',userRoutes);


// server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
})