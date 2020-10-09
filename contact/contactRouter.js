const  express = 	require("express");
       router  =  express.Router();
       controller = require('./contactController');
       auth1 = require('../middle');

router.route('/')
    .post(controller.contact)


module.exports = router;