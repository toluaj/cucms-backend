const Sequelize = require('sequelize');
const key = require('./keys');
const sequelize = new Sequelize(key.DB, key.USER, key.PASSWORD, {
    host: key.HOST,
    dialect: "mysql",
    port: key.PORT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.log("Unable to connect to the database.");
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./auth/user")(sequelize, Sequelize);
db.conference = require("./conference/conference")(sequelize, Sequelize);
db.program = require("./program/program")(sequelize, Sequelize);
db.activity = require("./activity/activity")(sequelize, Sequelize);
db.abstract = require("./uploads/uploadAbstract")(sequelize, Sequelize);
db.review = require("./reviews/review")(sequelize, Sequelize);
db.parties = require("./parties/parties")(sequelize, Sequelize);
db.paper = require("./paper/paper")(sequelize, Sequelize);
db.request = require("./requests/request")(sequelize, Sequelize);
db.assignments = require("./assignments/assignments")(sequelize, Sequelize);
db.payment = require("./payment/payment")(sequelize, Sequelize);

// db.conference.hasMany(db.user, {onDelete: "cascade"})
// db.user.belongsToMany(db.conference, { through: "user_conference", onDelete: "cascade"})

db.user.hasOne(db.abstract, { onDelete: "cascade" })
db.abstract.belongsTo(db.user, { onDelete: "cascade" })

db.conference.hasMany(db.abstract, { onDelete: "cascade"})
db.abstract.belongsTo(db.conference, {onDelete: "cascade"})

// db.program.hasMany(db.activity, {onDelete: "cascade"})
db.activity.belongsTo(db.program, {onDelete: "cascade"})

db.abstract.hasMany(db.review, {onDelete: "cascade"})
db.review.belongsTo(db.abstract, {onDelete: "cascade"})

db.conference.hasMany(db.paper, {onDelete: "cascade"})
db.paper.belongsTo(db.conference, {onDelete: "cascade"})

db.user.hasOne(db.paper, { onDelete: "cascade" })
db.paper.belongsTo(db.user, { onDelete: "cascade" })


// db.user.hasMany(db.request, {onDelete: "cascade"})
// db.request.belongsToMany(db.user, { through: "user_request", onDelete: "cascade"})


// db.sequelize.sync({force: true});


module.exports = db;