const  express = 	require("express");
       router  =  express.Router();
       controller = require('./conferenceController');


router.route('/')
.post(controller.decodeToken, controller.createConference);

router.route('/')
.get(controller.getConference);

router.route('/conference/:id')
.get(controller.decodeToken, controller.getOneConference);

router.route('/conference/:id')
.delete(controller.decodeToken, controller.deleteConference)

router.route('/papercall')
.post(controller.decodeToken, controller.paperCall);

router.route('/sub')
    .get(controller.abstractConferences)

module.exports = router;