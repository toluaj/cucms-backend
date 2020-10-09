var db = require('../db');
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

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

exports.getReviewers = (req, res) => {

    db.parties.findAll({
        where: {conference_id: req.params.id, role: "reviewer"}
    }).then(data => {
        if(!data) {return res.status(403).send({message: "could not find any reviewers", status: "failed"})}

        res.status(200).send({data, status: "success"});

    }).catch(err => {
        console.log(err);
        res.status(500).send({message: err.message})
    })

}

exports.getConferences = (req, res) => {

    db.parties.findAll({
        where: {user_id: req.user.id, role: {
            [Op.or]: ["chair", "admin"]
            }}
    }).then(data => {
        if(!data) {res.status(403).send({message: "could not find any user"})}

        res.status(200).send({data, status: "success"})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
}

exports.getParties = (req, res) => {

    db.parties.findAll({
        where: {conference_id: req.body.conference_id}

    }).then(data => {
        if(!data) {return res.status(403).send({message: "no one has registered", status: "failed" })}

        res.status(200).send({message: "success", data});

    }).catch(err => {
        return res.status(500).send({message: err.message, status: "failed" })
    })
}