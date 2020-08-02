const  express = 	require("express");
        router  =  express.Router();
        controller = require('./assController');
        auth1 = require('../middle');

router.route('/')
    .post(controller.assignAbstract)

router.route('/viewAssign')
    .get(auth1.decodeToken, controller.getAssignments)

module.exports = router;