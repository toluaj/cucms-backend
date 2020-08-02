var db = require('../db');


exports.assignAbstract = (req, res) => {

    db.assignments.create(req.body,
    ).then(data => {
        if(!data) {res.send(403).status({message: "could not assign abstract", status: 'failed'})}

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