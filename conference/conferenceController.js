var db = require("../db");
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});
    nodemailer = require('nodemailer');
const Op = db.Sequelize.Op;


exports.decodeToken = (req, res, next) => {
    checkToken(req, res, next);
}

var rand,mailOptions,link;
rand=Math.floor((Math.random() * 1000000) + 54);
console.log(mailOptions);
var host = "localhost:8080";

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});


exports.createConference = async (req, res) => {

    const {
        name,
        description,
        location,
        topic, 
        start_date,
        end_date,
        chair ,
        deadline
    } = req.body;


    if(!name){
        res.send({status : "failed", message : "Please enter conference name"});
    }
    if(!description){
        res.send({status : "failed", message : "Please enter description"});
    }
    if(!location){
        res.send({status : "failed", message : "Please enter location"});
    }
    if(!topic){
        res.send({status : "failed", message : "Please enter topic"});
    }
    if(!start_date){
        res.send({status : "failed", message : "Please enter start date"});
    }
    if(!end_date){
        res.send({status : "failed", message : "Please enter end date"});
    }
    if(!deadline){
        res.send({status : "failed", message : "Please enter end date"});
    }

    await db.conference.create({
        name,
        topic,
        location,
        description,
        start_date,
        end_date,
        chair,
        deadline

    }).then((data) => {

        if(!data) {
            return res.status(403).send({
                message: "can't save conference",
                status: "failed"});
        }

        else {

            res.status(200).send({
                message: "conference created",
                status: "success"
            })
        }
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).send({
            message: "something went wrong",
            status: "failed",
            err
        })
    })

}

exports.getConference = (req, res) => {
    db.conference.findAll({
        where: {start_date : {
            [Op.gt]: Date.now()
        }}
    }).then(data => {
        if(!data) {
             res.status(403).send({
                status: "failed",
                message: "no conference available"
            })
        };

        res.send({message: 'gotten', data})

        // const result = {Conferences: data.rows, count: data.count}

        // res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
}

exports.abstractConferences = (req, res) => {
    db.conference.findAll({
        where: {deadline: {
                [Op.gt]: Date.now()
            }}
    }).then(data => {
        if(!data) {
            res.status(403).send({
                status: "failed",
                message: "no conference available"
            })
        };

        res.send({message: 'gotten', data})

    })
}

exports.getOneConference = async (req,res) => {

    db.conference.findOne({
        where: {id: req.params.id}
    })
    .then((data) => {
        if(!data) {
            res.status(403).send({
                status: "failed",
                message: "this conference does not exist"
            })
        }
        res.status(200).send({status: "success", data})
    })
}

exports.deleteConference = async (req, res) => {

    await db.conference.destroy({
        where: 
         {id: req.params.id}
        

    }).then(data => {
        if(!data) {
            res.status(403).send({
                status : "failed",
                message: "can not find conference"
            })
        }

        res.status(200).send({status: "success", data})

    })
    .catch(err => {
        console.log(err.message);
        res.send({message: "could not delete conference"})
    })
}

exports.paperCall = async (req, res) => {

    const {name} = req.body;
    let emails = await db.user.aggregate(
        'email', 'DISTINCT',
        {plain: false});
        console.log(emails);
        link = "http://localhost:3000/login";
        emails.map( function (email) {
            console.log(email.DISTINCT); 
            mailOptions = {
                to: email.DISTINCT,
                subject: "CALL FOR PAPER ALERT",
                html: "Hello <br> This is to notify you that call for papers for "+name+
                " are now open.<br> <a href="+link+">Click here</a> to login and view more details on this conference."
            }
            console.log(mailOptions);
            transporter.sendMail(mailOptions, function (error, response) {
                if(error) {
                    console.log(error);
                }
                else {
                    res.status(200).send({mailOptions});
                    console.log("Message sent: " + response);
                }
            })
        })
}