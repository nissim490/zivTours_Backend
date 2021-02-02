const express = require('express');
const flightController = require('./../controllers/FlightsController');
const authController = require('../controllers/authController');


const router = express.Router();



router.route('/flight-stats').get(flightController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    flightController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(flightController.getToursWithin);


router
  .route('/search')
  .post(flightController.getAllFlights)

router
  .route('/')
  .get(flightController.getAllFlights)
  .post(
    authController.protect,
    flightController.createFlight
  );

router
  .route('/:id')
  .get(flightController.getFlight)
  .patch(
    authController.protect,
    flightController.updateFlight
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    flightController.deleteFlight
  );

module.exports = router;
