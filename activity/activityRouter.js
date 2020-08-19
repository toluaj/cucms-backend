const  express = 	require("express");
       router  =  express.Router();
       controller = require('./activityController');
       auth = require('../middle');

router.route('/')
.post(controller.decodeToken, controller.createActivity)
.get(controller.decodeToken, controller.getActivity)

router.route('/program/:id')
.get(controller.getProgram);

module.exports = router;