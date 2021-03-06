require('dotenv').config();
const createError = require('http-errors');
const engine = require('ejs-mate');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
/*
const seedPost = require('./seeds');

seedPost();
*/

// require routes
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const posts = require('./routes/posts');

const app = express();

// connect to the database
mongoose.connect('mongodb://localhost:27017/surf-shop', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected')
});

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Configure Passport and Sessions
app.use(session({
  secret: 'some string',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function (req, res, next) {
  req.user = {
    '_id' : '5d2ae413b39161497cb68c34',
    'username' : 'sasha'
    /*'_id' : '5d2c6a69f80f1a4c6c6a5589',
    'username' : 'john'*/
  };
  res.locals.currentUser = req.user;
  // success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});

// Mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  /*res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');*/
  req.session.error = err.message;
  res.redirect('back')
});

module.exports = app;
