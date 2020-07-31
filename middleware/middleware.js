var expressjwt = require("express-jwt"),
	checkToken = expressjwt({secret: "tolukey"});

exports.decodeToken = (req, res, next) => {
	checkToken(req, res, next);
}

