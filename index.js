const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, checkAdmin, requireAuth} = require('./middleware/auth.middleware');
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
app.use('/uploads/posts/videos/', express.static("uploads/posts/videos/"));
app.use('/uploads/profils/', express.static("uploads/profils/"));
app.use('/uploads/posts/', express.static("uploads/posts/"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', requireAuth);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user',userRoutes);
app.use('/api/admin', adminRoutes);

// server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
})