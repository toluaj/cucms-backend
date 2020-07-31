module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "projectdb",
    dialect: "mysql",
    PORT: "3306",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

// module.exports = {
//     secret: "tolu-key"
// }