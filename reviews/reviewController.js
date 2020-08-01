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
