const  express = 	require("express");
       router  =  express.Router();
       controller = require('./uploadAbsController');
       auth1 = require('../middle');

router.route('/upload')
    .post(auth1.decodeToken, controller.submitAbstract)
    .get(auth1.decodeToken, controller.getOneAbstract)

router.route('/:id')
    .delete(auth1.decodeToken, controller.deleteAbstract);

router.route('/view')
    .get(auth1.decodeToken, controller.getAbstracts);

module.exports = router;