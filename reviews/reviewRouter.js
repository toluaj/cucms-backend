const  express = 	require("express");
       router  =  express.Router();
       controller = require('./reviewController');
       auth1 = require('../middle');

router.route('/')
    .post(auth1.decodeToken, controller.makeReview)
    .get(auth1.decodeToken, controller.getReview);

router.route('/get')
    .post(controller.getAbstracts);

module.exports = router;