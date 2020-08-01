const  express = 	require("express");
       router  =  express.Router();
       controller = require('./requestController');
       auth1 = require('../middle');


router.route('/')
.post(auth1.decodeToken, controller.makeRequest)

router.route('/')
.get(auth1.decodeToken, controller.getUserRequest);

router.route('/reply')
.post(auth1.decodeToken, controller.replyRequest);

router.route('/chair/:id')
.post(auth1.decodeToken, controller.makeChairRequest);

router.route('/chair/reply')
.get(controller.findtoken, controller.replyRequest2);

router.route('/requests')
.get(auth1.decodeToken, controller.getAllRequests);

module.exports = router;