const db = require("../db");

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
        attributes: ["id", "path"]

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
