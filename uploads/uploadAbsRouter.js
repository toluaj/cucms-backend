const  express = 	require("express");
       router  =  express.Router();
       controller = require('./uploadAbsController');
       auth1 = require('../middle');

router.route('/upload')
    .post(auth1.decodeToken, controller.submitAbstract)
    .get(auth1.decodeToken, controller.getUserAbstract)

router.route('/:id')
    .delete(auth1.decodeToken, controller.deleteAbstract);

router.route('/view/:id')
    .get(controller.getAbstracts);

router.route('/:id')
    .get(controller.getOneAbstract)

module.exports = router;