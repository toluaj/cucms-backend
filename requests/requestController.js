var db = require('../db');
    nodemailer = require('nodemailer');
const crypto = require('crypto');
const Op = db.Sequelize.Op;

var rand,link, mailOptions;
rand=Math.floor((Math.random() * 1000000) + 54);
// console.log(mailOption);
var host = "localhost:8080";
var url = "http://localhost:3000/request/";
var url2 = "http://localhost:3000/chairRequest/";

const hi = () =>{
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'tolulope.ajia@stu.cu.edu.ng',
            pass: 'computer123'
        }
    });

    host=req.get('host');
    // link="http://"+req.get('host')+"/api/cu/request/reviewer/"+rand;
    link = "http://localhost:3000/request"
    console.log(host);
    console.log(link);
    mailOptions={
        to: email,
        subject: "Reviwer Request",
        html: "Hello <br>"+requester_id+" has asked you to be a reviewer for "+conference_name+"<br><a href="
               +link+">Click here to accept or decline</a>"
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
     }else{
            console.log("Message sent: " + response.message);
        }
    });
}

//get the user details of the user trying to answer request.
exports.findtoken = (req, res, next) => {
    db.user.findOne({
        where: {
            activeToken : req.body.token,
            activeExpires : {
                [Op.gt]: Date.now()
            }
        }
    })
    .then(data => {
        if(!data){ return res.status(403).send({message : "link has expired, please reset", status : "failed"})};

        req.foundUser = data;
        next();
    })
    .catch(err => res.status(422).send({message : err, status : "find token failed"}));
}

exports.replyRequest = async (req, res, next) => {
      
    const {reply, conference_id, firstName, lastName, email} = req.body;
    const user_id = req.user.id;
    console.log(req.user);

    if(reply === "accepted") {
        db.user.update({
            role: "reviewer"
        },{

            where: {id: user_id},
            returning : true,
            plain : true
            
        })
        .then(data => {
            if(!data){ res.send({message : "user not found", status : "failed"})};
          
              db.request.update({
                  reply: reply
              }, {
                  where: {user_id: user_id, conference_id: conference_id}
              })

              db.parties.create({

                user_id: user_id,
                conference_id: conference_id,
                role: "reviewer",
                affiliation: "Covenant University",
                  firstName: firstName,
                  lastName: lastName,
                  email: email
            })            

              
              console.log(user_id);
            res.send({message : "request accepted", status : "success"});
        })
        .catch(err => res.status(422).send({message : err, status : "failed"}));  
    }

    else if(reply === "rejected") {
        const user_id = req.user.id;
        
        db.request.update({
            reply: reply
        }, {
          where: {user_id: user_id, conference_id: conference_id}
      })
      .then(data => {
            if(!data){ res.send({message : "request accepted", status : "failed"})};
          
            res.status(200).send({message : "request rejected", status : "success"});
        })
        .catch(err => res.status(422).send({message : err, status : "failed"}));  
    }

}

exports.replyRequest2 = (req, res, next) => {

    const {reply, conference_id, firstName, lastName, email} = req.body;
    const user_id = req.user.id;
    console.log(req.user);

    if(reply === "accepted") {
        db.user.update({
            role: "chair"
        },{

            where: {id: user_id},
            returning : true,
            plain : true

        })
            .then(data => {
                if(!data){ res.send({message : "user not found", status : "failed"})};

                db.request.update({
                    reply: reply
                }, {
                    where: {user_id: user_id, conference_id: conference_id}
                })

                db.parties.create({

                    user_id: user_id,
                    conference_id: conference_id,
                    role: "chair",
                    affiliation: "Covenant University",
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })


                console.log(user_id);
                res.send({message : "request accepted", status : "success"});
            })
            .catch(err => res.status(422).send({message : err, status : "failed"}));
    }

    else if(reply === "rejected") {
        const user_id = req.user.id;

        db.request.update({
            reply: reply
        }, {
            where: {user_id: user_id, conference_id: conference_id}
        })
            .then(data => {
                if(!data){ res.send({message : "request accepted", status : "failed"})};

                res.status(200).send({message : "request rejected", status : "success"});
            })
            .catch(err => res.status(422).send({message : err, status : "failed"}));
    }

}

const mailOption = (email, token, name) => {
    return mailOption = {
        from: 'tolulope.ajia@stu.cu.edu.ng',
        to: email,
        subject: "Reviwer Request",
        html: "Hello <br> You have been invited to be a reviewer for "+name+
        " here in Covenant University<br> <a href=" +url+token+">Click this to accept or decline</a>"
    }
}

var mailOption2 = (email, token, name) => {
    return mailOption2 = {
        from: 'tolulope.ajia@stu.cu.edu.ng',
        to: email,
        subject: "Program Chair Request",
        html: "Hello <br> You have been invited to be a chair for "+name+
        " here in Covenant University<br> <a href=" +url2+token+">Click this to accept or decline</a>"
    }
}

const sendMail = (email, token, name) => {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'tolulope.ajia@stu.cu.edu.ng',
            pass: 'computer123'
        }
    });
    mailOption(email, token, name);
    transporter.sendMail(mailOption, function(err, info) {
        if(err){return next({message: err})}
        console.log(info)
    })
}

const sendMail2 = (email, token, name) => {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'tolulope.ajia@stu.cu.edu.ng',
            pass: 'computer123'
        }
    });
    mailOption2(email, token, name);
    transporter.sendMail(mailOption2, function(err, info) {
        if(err){return next({message: err})}
        console.log(info)
    })
}

const updateUser = ((email, token, name) => {

    db.user.update({
        activeToken : token, 
        activeExpires : Date.now() + 964000000, 
        returning: true,        
    }, {where: {email : email}})
    .then(data => sendMail(email, token, name))
    .catch(err => console.log(err));
});

const updateUser2 = ((email, token, name) => {

    db.user.update({
        activeToken : token, 
        activeExpires : Date.now() + 964000000, 
        returning: true,        
    }, {where: {email : email}})
    .then(data => sendMail2(email, token, name))
    .catch(err => console.log(err));
});

exports.makeRequest = (req, res, next) => {

    const {email, conference_name, user_id, conference_id, type} = req.body;
    console.log(req.user);
    var requester_id = req.user.id;
    var obj = {reply: "pending",
               conference_id,
               requester_id: requester_id,
               user_id, email, conference_name,
                type
            }
    db.request.create(
        obj
    ).then((data) => {
        if(!data){res.status(403).send({status: "failed", message: "could not do vis"})}

        else {
            
            crypto.randomBytes(20, (err, buffer) => {
                const token = buffer.toString('hex');
                console.log(token);
                var transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: 'tolulope.ajia@stu.cu.edu.ng',
                        pass: 'computer123'
                    }
                });
            
                host=req.get('host');
                link = "http://localhost:3000/login/"
                console.log(host);
                console.log(link);
                console.log(url);
                if(type === "reviewer") {
                    mailOptions={
                        to: email,
                        subject: "Reviwer Request",
                        html: "Hello <br> You have been invited to be a reviewer for "+conference_name+
                        " here in Covenant University<br> <a href=" +link+">Click here to login</a>"
                    }
                }
                else if (type === "chair") {
                    mailOptions={
                        to: email,
                        subject: "Program Chair Request",
                        html: "Hello <br> You have been invited to be a program chair for "+conference_name+
                        " here in Covenant University<br> <a href=" +link+">Click here to login</a>"
                    }
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                 if(error){
                        console.log(error);
                 }else{
                        console.log("Message sent: " + response.message);
                    }
                });
            })
            res.status(200).json({data, message : "success"});
        }
    })

    .catch(err => {
        console.log(err.message);
        res.status(500).send({status: "failed", message: "could not do this shit"})
    })
}

exports.makeChairRequest = (req, res, next) => {

    const {email, conference_name, user_id, type} = req.body;
    console.log(req.user);
    var requester_id = req.user.id;
    var obj = {reply: "pending", conference_name,
               conference_id: req.params.id, email,
               requester_id: requester_id, user_id, type}
    db.request.create(
        obj
    ).then((data) => {
        if(!data){res.status(403).send({status: "failed", message: "could not do vis"})}

        else {
            
            crypto.randomBytes(20, (err, buffer) => {
                const token = buffer.toString('hex');
                console.log(token);
                updateUser2(email, token, conference_name);
            })
            res.status(200).json({data, message : "success"});
        }
    })

    .catch(err => {
        console.log(err.message);
        res.status(500).send({status: "failed", message: "could not do this shit"})
    })
}

exports.getUserRequest = (req, res) => {

    // const {user_id} = req.body;
    console.log(req.user.id);
    db.request.findAll({
        where: {user_id: req.user.id}
    }).then(data =>{
        
        if(!data){return res.send({message: "you do not have any requests at this time", status: "failed"})}

         res.status(200).send({status: "success", data});
    }).catch(err => {
        res.status(500).send({message: err.message, status: "failed"})
        console.log(err.message);
    })

}

exports.getAllRequests = (req, res) => {

    db.request.findAll({
        
    }).then(data => {
        if(!data) {res.status(403).send({message: "could not get requests", status: "failed"})}

        res.status(200).send({data, status: "success"});
    })

}