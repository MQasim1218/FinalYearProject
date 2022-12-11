const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()


var indexRouter = require('./routes/index');
var beneficiaryRouter = require('./routes/BenificiaryRouter');
var donorRouter = require('./routes/DonorRouter');
var adminRouter = require('./routes/AdminRouter');
var campaignsGenRouter = require('./routes/CampaignGenRouter');
var campaignsSpecRouter = require('./routes/CampaignSpecRouter');
var donationRouter = require('./routes/DonationRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

mongoose.connect(process.env.MONGODB_PATH).then(() => { console.log("Successfully Connected to DB") })

app.use('/', indexRouter);
app.use('/benificiary', beneficiaryRouter);
app.use('/admin', adminRouter);
app.use('/donor', donorRouter);
app.use('/donations', donationRouter);
app.use('/gen_campaigns', campaignsGenRouter);
app.use('/spec_campaigns', campaignsSpecRouter);

console.log("Sucessfully Started Node App")

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
