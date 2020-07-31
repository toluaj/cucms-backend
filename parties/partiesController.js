var db = require('../db');
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});

exports.decodeToken = (req, res, next) => {
    checkToken(req, res, next);
}

exports.registerConference = (req, res) => {

    const {
        affiliation,
        role 
    } = req.body;


    db.parties.create({

        user_id: req.user.id,
        conference_id: req.params.id,
        role: "participant",
        affiliation

    }).then((data) => {

        if(!data){res.status(403).send({status: "failed", message: "could not find conference"})}

        res.status(200).send({status: "success", message: "registered successfully"})
        
    }).catch (err => {
        console.log(err.message);
        res.send({message: "something went wrong"})
    })

}