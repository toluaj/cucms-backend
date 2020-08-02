const  express = 	require("express");
       router  =  express.Router();
       controller = require('./userController');

    router.route('/')
    .post(controller.create)
    .get(controller.getAllUsers);

    router.route('/verify/:id')
    .get(controller.verify)

    router.route('/login')
    .post(controller.signIn)

    router.route('/logged')
    .get(controller.decodeToken, controller.getLoggedStaff)

    router.route('/:id')
    .get(controller.decodeToken, controller.getOneUser)

    router.route('/updateRole')
    .post(controller.updateRole)

    router.route('/:id')
    .delete(controller.deleteEmployee)

    router.route('/loggedOnUser')
    .get(controller.decodeToken, controller.signedInUser)

    router.route('/edit')
    .put(controller.decodeToken, controller.editUser);

module.exports = router;