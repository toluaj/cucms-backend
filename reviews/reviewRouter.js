const  express = 	require("express");
       router  =  express.Router();
       controller = require('./reviewController');
       auth1 = require('../middle');

router.route('/')
.post(auth1.decodeToken, controller.makeReview);

module.exports = router;