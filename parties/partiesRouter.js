const  express = 	require("express");
       router  =  express.Router();
       controller = require('./partiesController');
       auth = require('../middle');

router.route('/:id')
.post(auth.decodeToken, controller.registerConference)

router.route('/:id')
    .get(controller.getReviewers)

router.route('/')
    .get(auth.decodeToken, controller.getConferences)
    .post(auth.decodeToken, controller.getParties)

module.exports = router;