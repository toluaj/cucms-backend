const  express = 	require("express");
        router  =  express.Router();
        controller = require('./paperController');
        auth1 = require('../middle');

router.route('/upload')
    .post(auth1.decodeToken, controller.submitPaper)


module.exports = router;