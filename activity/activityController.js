var db = require('../db');
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});

exports.decodeToken = (req, res, next) => {
    checkToken(req, res, next);
}

const Acts = db.program.hasMany(db.activity, {onDelete: "cascade",as:"acts"})

exports.createActivity = async (req, res) => {

    // const {
    //     name,
    //     room,
    //     date,
    //     start_time,
    //     end_time,
    //     conference_id,
    //     program, spaces
    // } = req.body;

    // if(!name) {
    //     res.send({status: "failed", message: "please enter name"})
    // }
    // if(!room) {
    //     res.send({status: "failed", message: "please enter room"})
    // }
    // if(!date) {
    //     res.send({status: "failed", message: "please enter date"})
    // }
    // if(!start_time) {
    //     res.send({status: "failed", message: "please enter starttime"})
    // }
    // if(!end_time) {
    //     res.send({status: "failed", message: "please enter endtime"})
    // }
    // {                     
    //     name: 'Plonire',    
    //     date: '2020-08-21', 
    //     start_time: '13:00',
    //     end_time: '14:00',  
    //     room: 'conference', 
    //     spaces: '23',       
    //     program: 'Misimia', 
    //     conference_id: '2'  
    //   }                     
    //   {                     
    //     name: 'Ajia',       
    //     date: '2020-08-21', 
    //     start_time: '15:00',
    //     end_time: '16:00',  
    //     room: 'chapel',     
    //     spaces: '23',       
    //     program: 'Misimia', 
    //     conference_id: '2'  
    //   }                     

    await db.program.create(req.body, {
        include: [{
            association: Acts,
            as: 'acts',
          }]

      })
    .then((data) => {

        if(!data){
            res.send({status: "failed", message: "could not create activity"})
        }

        else {
            res.status(200).send({
                message: "program created",
                status: "success", data
            })
            // console.log(req.body);
            console.log(data);
            // console.log(req.body);
            console.log(req.query);
        }
    })
    .catch(err => {
        return res.send({
            message: err.message,
            status: "failed"
        })
    
    })
}

exports.getProgram = (req, res) => {
    // const {conference_id} = req.body;
    console.log(req.body);
    console.log(req.params);
    db.program.findAll({
        where: {conference_id: req.params.id},
        include: [
            {
                model: db.activity,
                as: "acts",
                attributes: ['room', 'name', 'start_time', 'end_time', 'date']
            }
        ]
    })  
        .then(program => {
        if(!program){
            res.send({status: "failed", message: "could not create activity"})
        }

        res.status(200).send({program, status: "success"})
            console.log(req.body);
    })
}

exports.getActivity = async (req, res) => {

    await db.activity.findAll({
        where: { conference_id: req.body.conference_id}
    }).then(data => {
        if(!data) {
            res.status(403).send({
                status: "failed",
                message: "there are no activities for this conference"
            }) 
        }

        res.send(data);

    }).catch(err => {
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    })
}