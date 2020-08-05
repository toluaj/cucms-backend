const  express = 	require("express");
       router  =  express.Router();
       controller = require('./paymentController');
       auth1 = require('../middle');

router.route('/')
    .post(auth1.decodeToken, controller.confirmPayment);

module.exports = router;