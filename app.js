const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
var cors = require('cors')
const toursRouter = require('./routes/toursRoutes');
const flightsRouter = require('./routes/FlightsRoutes');
const userRouter = require('./routes/userRoutes');



const app = express();

app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files


// Set security HTTP headers
app.use(helmet());


// Limit requests from same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(cors())


// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/flights', flightsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', toursRouter);




app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
/* "server": " nodemon server.js",
"backrground": "nodemon backrground.js",
"start": " npm-run-all --parallel server backrground", */
module.exports = app;
