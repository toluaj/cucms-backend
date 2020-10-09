var db = require('../db');
    nodemailer = require('nodemailer');


var mailOptions;

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});

exports.assignAbstract = (req, res) => {

    db.assignments.create(req.body,
    ).then(data => {
        if(!data) {res.send(403).status({message: "could not assign abstract", status: 'failed'})}

        else {

        }
        res.status(200).send({status: "success", data})

    })
        .catch(err => {
            console.log(err.message);
            res.status(500).send(err.message)
        })

}

exports.getAssignments = (req, res) => {

    db.assignments.findAll({
        where: {reviewer_id: req.user.id}
    }).then(data => {
        if(!data){res.status(403).send({message: "could not get assigned abstracts", status: "failed"})}

        res.status(200).send({data, status: "success"})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send({message: err.message})
    })
}