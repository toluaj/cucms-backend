var db = require('../db');
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});

exports.decodeToken = (req, res, next) => {
    checkToken(req, res, next);
}

exports.createProgram = (req, res) => {

    const {name} = req.body;

    db.program.create({
         name
    }).then((data) => {
        if(!data) {
            res.send({status: "failed", message: "could not create program"})
        }

        else {
            res.status(200).send({message: "program created sis", status: "thuxtheth", data})
        }
    })
    .catch(err => {
        res.send({status: "failed", message: "something went wrong"})
    })

}