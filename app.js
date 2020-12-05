var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var billRouter = require('./routes/bills');

var customerRouter = require('./routes/customers');


var employeeRouter = require('./routes/employees');

var inventoryRouter = require('./routes/inventories');

var loginRouter = require('./routes/login');

var productRouter = require('./routes/products');

var receiptRouter = require('./routes/receipts');

var statisticRouter = require('./routes/statistics');

var supplierRouter = require('./routes/supplies');
var supplierNewRouter = require('./routes/supplierNew');
var supplierDetailRouter = require('./routes/supplierDetail');
var supplierListRouter = require('./routes/supplierList');

var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bills', billRouter);
app.use('/customers', customerRouter);
app.use('/employees', employeeRouter);
app.use('/inventories', inventoryRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/receipts', receiptRouter);
app.use('/statistics', statisticRouter);
app.use('/suppliers', supplierRouter);
app.use('/supplierNew', supplierNewRouter);
app.use('/supplierDetail', supplierDetailRouter);
app.use('/supplierList', supplierListRouter);
app.use('/users', usersRouter);
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
