const db = require("../db");
const nodemailer = require('nodemailer');


var link, mailOptions;
link = "http://localhost:3000/login/";
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});

exports.submitAbstract = async (req, res) => {

    const {
        title,
        abstract_text,
        affiliation,
        firstName,
        lastName,
        email, 
        conference_id, status
    } = req.body;

    if(!title) {
        res.send({message: "please add title"})
    }
    if(!abstract_text) {
        res.send({message: "please add abstract text"})   
    }
    if(!affiliation) {
        res.send({message: "please add affiliation"})
        
    }
    if(!firstName) {
        res.send({message: "please add first name"})
        
    }
    if(!lastName) {
        res.send({message: "please add last name"})
        
    }
    if(!email) {
        res.send({message: "please add email"})
        
    }

    var abstractfile = req.files.abstract;

    // abstractfile.mv("public/abstracts/" + abstractfile.name,
    // function (error)  {
    //     if(error) {
    //         console.log("couldn't upload game file");
    //         console.log(error);
    //     }
    //     else {
    //         console.log("File successfully uploaded");
    //     }
    // })

    abstractfile.mv(__dirname+ '/uploads/' + abstractfile.name,
    function (error)  {
        if(error) {
            console.log("couldn't upload game file");
            console.log(error);
        }
        else {
            console.log("File successfully uploaded");
        }
    })

    await db.abstract.create({
        title,
        abstract_text, 
        affiliation, 
        firstName, 
        lastName, email,
        abstract:abstractfile.name,
        user_id: req.user.id,
        path: `${abstractfile.name}`,
        file_type: `${abstractfile.mimetype}`,
        conference_id, status
    }).then((data) => {
    
        if(!data) {
            res.send({
                status: false,
                message: "could not upload file"
            })
        
        }

        res.send({
            status: true,
            message: "File uploaded",
            data: {
                name: abstractfile.name,
                mimetype: abstractfile.mimetype,
                size: abstractfile.size,
                path: `${abstractfile.name}`,
                data
            }
        })
    })
    .catch (err => {
        res.status(500).send(err.message);
    })

};

const dir = '/uploads/'

exports.getUserAbstract = async (req, res) => {

    db.abstract.findAll({

        where: {
            user_id: req.user.id
        },
        // attributes: ["id", "path"]

    }).then((data) => {
        if(!data) {
            res.send({status: "failed", message: "could not find any abstract"})
        }

        return res.status(200).send({
            message: "abstract retrieved",
            data,
            file: (dir + `${data.path}`)
        });
        
 
    })
    .catch (err => {
        console.log(err.message);
    })
};

exports.deleteAbstract = (req, res, next) => {
    db.abstract.destroy({
        where : {id : req.params.id}
    })
    .then(data => {
        if(!data){ return res.status(403).send({message : "can't delete abstract", status : "failed"});}
        res.status(200).json(data);
    })
    .catch(err => res.status(500).send(err));
};

exports.getAbstracts = (req, res) => {

    db.abstract.findAndCountAll({
        where: {conference_id: req.params.id},
    })
        .then(data => {
            if(!data) {res.status(403).send({message: "could not find abstracts", status: "failed"})}

            res.status(200).send({data, status: "success"})
        })
}

exports.getOneAbstract = (req, res) => {

    db.abstract.findOne({
        where: {id: req.params.id}
    }).then(data => {
        if(!data) {res.status(403).send({message: "could not get abstract", status: "failed"})}

        res.status(200).send({data, status: "success"})

    }).catch(err => {
        console.log(err.message)
        res.status(500).send({message: err.message})
    })
}

exports.updateStatus = (req, res) => {
    const {status, id, email, name} = req.body;
    db.abstract.update({
        status: status
    },{

        where: {id: id},
        returning : true,
        plain : true

    }).then(data => {
        if(!data) {res.status(403).send({message: "could not perform", status: "failed"})}

        else {

            if(status === "accepted") {
                // db.parties.update({
                //     role: "author"
                // },{
                //
                //     where: {id: req.user.id},
                //     returning : true,
                //     plain : true
                //
                // })

                console.log(link);
                mailOptions={
                    to: email,
                    subject: "ABSTRACT UPDATE" +name+"",
                    html: "Hello <br> We are pleased to inform you that your abstract has been accepted " +
                        "to be presented in "+name+ " here in Covenant University<br> <a href=" +link+">Click here to login</a>"
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                });

                res.status(200).json({data, message : "success"});
            }

            else if(status === "declined") {

                mailOptions={
                    to: email,
                    subject: "ABSTRACT UPDATE FOR" +name+"",
                    html: "Hello <br> We regret to inform you that your abstract was rejected " +
                        "for the "+name+ ". We hope to have you next time!<br> <a href=" +link+">Click here to login</a>"
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                });

                res.status(200).json({data, message : "success"});
            }
            console.log(status);
            res.status(200).send({data, status: "success"})

        }

    }).catch(err => {
        console.log(err.message);
        res.status(500).send(err.message);
    })
}