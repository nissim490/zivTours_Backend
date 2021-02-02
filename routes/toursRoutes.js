const express = require('express');
const tourController = require('../controllers/ToursController ');
const authController = require('../controllers/authController');


const router = express.Router();


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/flight-stats').get(tourController.getTourstats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getMonthlyPlan
  );

  router
  .route('/search')
  .post(tourController.getAllTours)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
     authController.protect,
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour
  );

module.exports = router;
