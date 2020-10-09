var db = require('../db');
    nodemailer = require("nodemailer");

var mailOptions;
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});

exports.contact = (req, res) => {

    db.contact.create({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        message: req.body.message,
        email: req.body.email

    }).then(data => {
        if(!data) { return res.send({message: 'could not create message'})}

        else {

            res.status(200).send({data, message : "success"});
        }

    }).catch(err => {
        console.log(err.message);

        res.status(500).send({status: 'failed', message: err.message})
    })


}