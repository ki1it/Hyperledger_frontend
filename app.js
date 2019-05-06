var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addDocumentRouter = require('./routes/addDocument');
var signDocsRouter = require('./routes/signDocs');
var userProfileRouter = require('./routes/userProfile');

var app = express();
require('./database/lib/dbInit')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
var UserLogin = require('./database/models/UserLogin');
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({extended: true}));
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect(req.originalUrl);
  } else {
    next();
  }
};
//end of auth part



app.get('/', sessionChecker, (req, res) => {

  res.redirect('/login');
})
// // route for user signup
// app.route('/signup')
//     .get((req, res) => {
//       res.render(__dirname + '/views/signup.pug');
//     })
//     .post((req, res) => {
//       UserLogin.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         role: req.body.role,
//         worker_id: req.body.wid
//       })
//           .then(user => {
//             req.session.user = user.dataValues;
//             res.redirect('/signup');
//           })
//           .catch(error => {
//             res.redirect('/signup');
//           });
//     });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
      res.render(__dirname + '/views/login.pug');
    })
    .post((req, res) => {
      var username = req.body.username,
          password = req.body.password;

      UserLogin.findOne({where: {Login: username}}).then(function (user) {
        if (!user) {
          res.redirect('/login');
        } else if (user.dataValues.Password!==password) {
          res.redirect('/login');
        } else {
          req.session.user = user.dataValues;
          // if (user.dataValues.role === 'admin') {
          //   res.redirect('/signup')
          // }
          // if (user.dataValues.role === 'administrator') {
            res.redirect('/index')
          //}

          // if (user.dataValues.role === 'worker') {
          //     res.redirect('/zadForWorker?id=' + user.dataValues.worker_id)
          // }
        }
      });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + '/public/dashboard.html');
  } else {
    res.redirect('/login');
  }
});


// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});


app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/addDocument', addDocumentRouter);
app.use('/signDocs', signDocsRouter);
app.use('/userProfile', userProfileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
