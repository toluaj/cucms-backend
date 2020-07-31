const  express = 	require("express");
       router  =  express.Router();
       controller = require('./uploadAbsController');

router.route('/upload')
.post(controller.decodeToken, controller.submitAbstract)
.get(controller.decodeToken, controller.getOneAbstract)

router.route('/:id')
.delete(controller.decodeToken, controller.deleteAbstract)

module.exports = router;