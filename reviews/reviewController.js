var db = require('../db');


exports.makeReview = (req, res) => {

    // const {abstract_id, user_id, conference_id, feedback, recommendation} = req.body;

    db.review.create(
        req.body
    ).then(data => {
        if(!data) {return res.status(403).send({message: "could not enter review", status:"failed"})}

        res.status(200).send({status: "success", data})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send({message: err.message, status: "failed"})
    })
}

exports.getParties = (req, res) => {

    db.parties.findAll({
        where: {user_id: req.user.id, role: "chair"}
    }).then(data => {
        if(!data) {res.status(403).send({message: "could not find user", status: "failed"})}

        res.status(200).send({data, status: "success"})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
};

exports.getAbstracts = (req, res) => {
    const {conference_id} = req.body;
    db.review.findAll({
        where: {conference_id: conference_id},
        include: [{
            model: db.abstract,
            attributes: ['id', 'abstract_text', 'path', 'firstName', 'lastName', 'status', 'email'],
            include: [{
                model: db.conference,
                attributes: ['name']
            }
            ]
        }
        ]

    })
      .then(data => {
        if(!data) {res.status(403).send({message: "could not find abstracts", status: "failed"})}

        res.status(200).send({data, status: "success"})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })

}

exports.getReview = (req, res) => {

    db.review.findOne({

        where: {user_id: req.user.id}

    }).then(data => {

        if(!data) {return res.status(403).send({message: "could not find review", status:"failed"})}

        res.status(200).send({status: "success", data})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send({message: err.message, status: "failed"})
    })
}