var createError = require('http-errors');
var express = require('express');


var expressHbs =  require('express-handlebars');


var app = express();


var path = require('path');

var cookieParser=require("cookie-parser");
var connectFlash=require("connect-flash");
var session=require("express-session");
var passport=require("passport");

var logger = require('morgan');



const multer = require('multer');

app.use(cookieParser('secret'));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge: 6000000000
  }

}));

app.use(connectFlash());



const initPassportLocal=require('./Controller/passportLocalController');
initPassportLocal();


app.use(passport.initialize());
app.use(passport.session());


const authenthicate=require('./Controller/loginController');
app.use(authenthicate.checkSignIn);




var indexRouter = require('./routes/index');

var billRouter = require('./routes/bills');

var customerRouter = require('./routes/customers');

var employeeRouter = require('./routes/employees');

var inventoryRouter = require('./routes/inventories');

var productRouter = require('./routes/products');

var receiptRouter = require('./routes/receipts');

var statisticRouter = require('./routes/statistics');

var supplierRouter = require('./routes/suppliers');



var usersRouter = require('./routes/users');

var profileRouter = require('./routes/profile');


var defaultRouter=require('./routes/defaultRoute');




var bodyParser=require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var hbs = expressHbs.create({});


var handleBar=require('hbs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');






app.use('/products', productRouter);

app.use('/',defaultRouter);
app.use('/users',usersRouter);
app.use('/index',indexRouter);
app.use('/bills', billRouter);
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/inventories', inventoryRouter);

app.use('/receipts', receiptRouter);
app.use('/statistics', statisticRouter);
app.use('/suppliers', supplierRouter);
app.use('/profile',profileRouter);
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

handleBar.registerHelper('CheckGioiTinh',function(Value,CurrentValue) {
  if (Value==CurrentValue)
  {
    return 'checked';
  }
  else
  {
    return "";
  }

});

handleBar.registerHelper('DisplayPage',function(v1,operator,v2,options)
{

  v1=parseInt(v1);
  v2=parseInt(v2);

  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
})






hbs.handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

module.exports = app;
