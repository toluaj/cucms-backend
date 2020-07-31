var db = require("../db");
    bcrypt 	 = require('bcryptjs');
    nodemailer = require("nodemailer");
    jwt = require("jsonwebtoken");
    config = require("../keys");
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});

const Op = db.Sequelize.Op;

var rand,mailOptions,link;
rand=Math.floor((Math.random() * 1000000) + 54);
console.log(mailOptions);
var host = "localhost:8080";
var url = "http://localhost:3000/login"
const sendMail = (email) => {
    console.log(email);
    var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});
    host=req.get('host');
    link="http://"+req.get('host')+"/api/cu/users/verify/"+rand;
    console.log(host);
    console.log(link);
    const mailOptions={
        to: email,
        subject: "Please confirm your Email account",
        html: "Hello <br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
     }else{
            console.log("Message sent: " + response.message);
        }
    });
};

exports.verify = (req, res) => {
    console.log(req.protocol+"://"+req.get('host'))
    console.log(req.get('host'));
    console.log(req.protocol);
    console.log(host);
    console.log(rand);
    console.log(req.query.id);
    if((req.protocol+"://"+req.get('host'))==("http://"+host)) 
    {
        console.log("Domain is matched. Information is from Authentic email");
        console.log(rand);
        console.log(req.params.id);
        if(req.params.id==rand)
    {
        console.log("email is verified");
        // res.render("<h5> Your email, "+mailOptions.to+" has been successfully verified. You can log in now");
        res.redirect(url);
        db.user.update(
            {active : true},
            {returning: true,
            where: {email : mailOptions.to}

        })
    }
    else
    {
        console.log("email is not verified");
        res.send("<h1>Bad Request</h1>");
    }
}
    else
{
    res.send("<h1>Request is from unknown source");
}
}

exports.create = async (req, res) => {

    const {
        firstName,
        lastName,
        address,
        phoneNumber,
        alternate_phone,
        title,
        gender,
        username,
        email,
        password,
        country,
        role        
    } = req.body;

    if(!firstName){
        res.send({status : "failed", message : "Please enter first name"});
    }
    if(!lastName){
        res.send({status : "failed", message : "Please enter last name"});
    }
    if(!address){
        res.send({status : "failed", message : "Please enter address"});
    }
    if(!phoneNumber){
        res.send({status : "failed", message : "Please enter phonenumber"});
    }
    if(!email){
        res.send({status : "failed", message : "Please enter email"});
    }
    if(!country){
        res.send({status : "failed", message : "Please enter country"});
    }
    if(!gender){
        res.send({status : "failed", message : "Please select gender"});
    }

    await db.user.create({
        
        firstName,
        lastName,
        address,
        phoneNumber,
        alternate_phone,
        title,
        username,
        gender,
        email,
        password: bcrypt.hashSync(req.body.password, 8),
        country,
        role

    }).then((data) => {

		if(!data){ 
		return res.status(403).send({message: "can't store employee", status : "failed"});
		}

        else {  
            // sendMail(data.email);
            var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'tolulope.ajia@stu.cu.edu.ng',
                pass: 'computer123'
            }
            });
            host=req.get('host');
            link="http://"+req.get('host')+"/api/cu/users/verify/"+rand;
            console.log(host);
            console.log(link);
            mailOptions={
                to: email,
                subject: "Please confirm your Email account",
                html: "Hello <br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
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
      //       jwt.sign(
      //       {
      //           user: _.pick(user, 'id'),
      //       },
      //       'asdf1093KMnzxcvnkljvasdu09123nlasdasdf',
      //       {
      //       expiresIn: '1d',
      //       },
      //       (err, emailToken) => {
      //       const url = `http://localhost:3000/confirmation/${emailToken}`;

      //       transporter.sendMail({
      //       to: email,
      //       subject: 'Confirm Email',
      //       html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      //     });
      //   },
      // );
        }

		})
		.catch(err => {
			console.log(err);
			return res.status(403).send({message : "something went wrong", status : "failed"});
			
		})

}

exports.signIn = async (req, res) => {
    var email = req.body.email;
        password = req.body.password;

    await db.user.findOne({
        attributes: ['id', 'email', 'password', 'active'],
        where: {
            email: email,
            active: true,
        }
    })
    .then(user => {
        if(!user){
             res.send({
                status: "failed", message: "verify your email address"})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password);

        if(!passwordIsValid) {
            return res.send({
                _token: null,
                message: "Invalid password!"
            })
        }

        var token = jwt.sign({id: user.id}, "tolukey", {
            expiresIn: 24 * 7 * 3600
        });

        res.status(200).send({
            status: "success",
            data: user,
            _token: token
        });    

    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.decodeToken = (req, res, next) => {
    checkToken(req, res, next);
}

exports.getLoggedStaff = (req, res, next) => {

    db.user.findOne({
        where: {id: req.user.id}
    }).then(data => {
        if(!data) {
            return res.status(403).send
            ({message: "employee does not exist",
              status: "failed"})
        }

        res.status(200).send({
            data,
            status:"success"});
    })
    .catch(err => res.status(500).send({
        status: "failed", message: err
    }))
}

exports.deleteEmployee = (req, res, next) => {
    db.user.destroy({
        where : {id : req.params.id}
    })
    .then(data => {
        if(!data){ return res.status(403).send({message : "can't delete employee", status : "failed"});}
        res.status(200).json(data);
    })
    .catch(err => res.status(500).send(err));
};

exports.signedInUser = (req, res, next) => {
	db.user.findOne({
		where: {id : req.user.id}
	}).then((data) => {
		if(!data){ return res.status(403).send({message: "staff does not exist", status : "failed"});}

        res.status(200).send({status: "success", data});
        req.signedInUser = data;
        // console.log(data);

	}).catch(err => {
        console.log(err);
        res.status(500).send({
            status: "failed",
            message: "network error"})
    })
}

exports.updateRole = (req, res) => {

var email = req.body.email;
var role = req.body.role;

    db.user.update({
        role: role
    },{
        where: {email: email}
    }).then(data => {
        if(!data){res.status(403).send({status: "failed", message: "could not update role"})}

        res.status(200).send({status: "success", message: "role updated"})

    }).catch(err => {
        console.log(err.message);
        res.status(500).send({status: "failed", message: "something went wrong"})
    })
}

exports.getAllUsers = (req, res) => {

    db.user.findAll()
    .then(data => {
        if(!data) {
            res.status(403).send({message: "no users found", status: "failed"})
        }
        res.status(200).send({data, status: "success"})
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({message: err.message, status: "failed" })
    })
}

exports.getOneUser = (req, res) => {

    db.user.findOne({
        where: {id: req.params.id}
    })
    .then((data) => {
        if(!data) {
            res.status(403).send({
                status: "failed",
                message: "this conference does not exist"
            })
        }
        res.status(200).send({status: "success", data})
    })

}

exports.editUser = (req, res) => {
    db.user.update(req.body,{where: {user_id : req.user.id}

    })
     .then((rowsUpdated) => {
         console.log(rowsUpdated);

         if(!rowsUpdated){ return res.status(403).send({message : "can't update employees", status : "failed"})}
          
         res.send({status: "success"})

     }, (err) => { return next(err);

})
}