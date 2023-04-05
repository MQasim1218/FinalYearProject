const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()


var indexRouter = require('./routes/index');

// NOTE: All user routers
var beneficiaryRouter = require('./routes/Users/BenificiaryRouter');
var donorRouter = require('./routes/Users/DonorRouter');
var adminRouter = require('./routes/Users/AdminRouter');
var superAdminRouter = require('./routes/Users/SuperAdminRouter')

// NOTE: All campaigns routers
var campaignsGenRouter = require('./routes/Campaigns/CampaignGenRouter');
var campaignsSpecRouter = require('./routes/Campaigns/CampaignSpecRouter');

// NOTE: All donation routers
var adminDonationRouter = require('./routes/Donations/AdminDonRouter');
var donorDonationRouter = require('./routes/Donations/DonorDonRouter');
var superAdminDonationRouter = require('./routes/Donations/SupAdminDonRtr');
var chatRouter = require('./routes/Chat/chatRouter');

// TODO: Reports and Analytics routers need to be configured as required!!  

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

// User Routers
app.use('/benificiary', beneficiaryRouter);
console.log("Going to admin router")
app.use('/admin', adminRouter);
app.use('/superAdmin', superAdminRouter);
app.use('/donor', donorRouter);

// Donation Routers
app.use('/adminDonations', adminDonationRouter);
app.use('/donorDonations', donorDonationRouter);
app.use('/superAdminDonations', superAdminDonationRouter);


app.use('/gen_campaigns', campaignsGenRouter);
app.use('/spec_campaigns', campaignsSpecRouter);

app.use('/chat', chatRouter);


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
