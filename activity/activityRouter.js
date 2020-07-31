const  express = 	require("express");
       router  =  express.Router();
       controller = require('./activityController');


router.route('/')
.post(controller.decodeToken, controller.createActivity)
.get(controller.decodeToken, controller.getActivity)

router.route('/get')
.get(controller.getProgram);

module.exports = router;