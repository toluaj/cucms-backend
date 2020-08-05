var db = require('../db');


exports.confirmPayment = (req, res) => {

    const {firstName, lastName, ref, program_id, email, affiliation, conference_id, conference_name} = req.body;

    db.payment.create({

        ref, user_id: req.user.id, program_id

    }).then(data => {
        if(!data) {res.status(403).send({message: "could not finish transaction", status: "failed"})}

            db.parties.create({
                firstName,
                lastName,
                email, affiliation, conference_id, conference_name,
                role: "participant", user_id: req.user.id
            }).then(data => {
                if(!data) {res.status(403).send({message: "could not create party", status: "failed"})}

                res.status(200).send({data, status: "success"})

            })
        res.status(200).send({data});

    }).catch(err => {
        res.status(500).send(err.message);
        console.log(err.message)
    })
}