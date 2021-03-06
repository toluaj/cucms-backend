var db = require("../db");
    bcrypt 	 = require('bcryptjs');
    nodemailer = require("nodemailer");
    jwt = require("jsonwebtoken");
    config = require("../keys");
    expressjwt = require("express-jwt");
    checkToken  = expressjwt({secret : "tolukey", algorithms: ['HS256']});

const Op = db.Sequelize.Op;
const crypto = require('crypto');

var rand,mailOptions,link;
rand=Math.floor((Math.random() * 1000000) + 54);
console.log(mailOptions);
var host = "localhost:8080";
var url = "http://localhost:3000/login"

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'tolulope.ajia@stu.cu.edu.ng',
        pass: 'computer123'
    }
});

exports.verify = (req, res) => {
    console.log(req.protocol+"://"+req.get('host'))
    console.log(req.get('host'));
    console.log(req.protocol);
    console.log(host);
    console.log(rand);
    console.log(req.query.id);
    console.log(mailOptions);
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
            host=req.get('host');
            link="http://"+req.get('host')+"/api/cu/users/verify/"+rand;
            console.log(host);
            console.log(link);
            mailOptions={
                to: email,
                subject: "Please confirm your Email account",
                html: "Hello <br><a href="+link+">Click this link to verify your account</a>"
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
    db.user.update(req.body,{where: {id : req.user.id}

    })
     .then((rowsUpdated) => {
         console.log(rowsUpdated);

         if(!rowsUpdated){ return res.status(403).send({message : "can't update employees", status : "failed"})}
          
         res.send({status: "success"})

}).catch(err => {
    console.log(err.message);
    res.status(500).send({message: err.message})
    })
}

const mailOption1 = (user, token) => {
    const url = "http://localhost:3000/reset/"
    return mailOptions = {
        from: 'CUCMS <tolulope.ajia@stu.cu.edu.ng>',
        to   : user.email,
        subject : 'PASSWORD RESET',
        html : '<p>Hello,<br/> You requested a password reset on the CUCMS platform. <br/>' +
            'If this was you, <a href= '+url+token+'>please click</a><br/> If not, ignore this.'
    };
}

const sendMail = (user, token) => {

    mailOption1(user, token);
    transporter.sendMail(mailOptions, function(err, info) {
        if(err){ return {message : err, status : "failed"}};
        console.log(info);
    })
}

const updateUser = ((user, token) => {

    db.user.update({
        activeToken : token,
        activeExpires : Date.now() + 86400000,
        returning: true,
    }, {where: {id : user.id}})
        .then(data => sendMail(user, token))
        .catch(err => res.send(err));
});

exports.forgotPassword = (req, res) => {

    db.user.findOne({
        where: {
            email : req.body.email
        }
    })
        .then(user => {
            if(!user){ return res.status(403).send({message : "user not found", status : "failed"})};

            crypto.randomBytes(20, (err, buffer) => {
                const token = buffer.toString('hex');
                updateUser(user, token);
            });
            res.send({message : "Please check your email for your password reset link"});
        })
        .catch(err => res.send(err));

};

exports.findToken = (req, res, next) => {
    db.user.findOne({
        where: {
            activeToken : req.body.token,
            activeExpires : {
                [Op.gt]: Date.now()
            }
        }
    })
        .then(data => {
            if(!data){ res.send({message : "link has expired, please reset", status : "failed"})};

            req.foundUser = data;
            next();
        })
        .catch(err => res.send(err));
}

exports.change_password = (req, res, next) => {

    const {password, confirm_password} = req.body;
    if(password !== confirm_password){
        res.send({message : "password does not match", status : "failed"});
    };

        db.user.update({
            password : bcrypt.hashSync(password, 8),
            activeToken : null,
            activeExpires : null

        },{
            where: {activeToken : req.body.token,
                activeExpires : {
                    [Op.gt]: Date.now()
                }},
            returning : true,
            plain : true
        })
            .then(data => {
                if(!data){ next(res.send({message : "password reset failed", status : "failed"}))};

                res.send({message : "Password reset successful, please login"});
            })
            .catch(err => res.send({message : err, status : "failed"}));

}