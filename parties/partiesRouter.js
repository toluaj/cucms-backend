const  express = 	require("express");
       router  =  express.Router();
       controller = require('./partiesController');


router.route('/:id')
.post(controller.decodeToken, controller.registerConference)

module.exports = router;