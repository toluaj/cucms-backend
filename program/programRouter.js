const  express = 	require("express");
       router  =  express.Router();
       controller = require('./programController');


router.route('/')
.post(controller.decodeToken, controller.createProgram);

module.exports = router;