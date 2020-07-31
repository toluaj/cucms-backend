const express = require('express');
      cors = require('cors');
      bps = require('body-parser');
      app = express();
      db = require('./db');
      fileUpload = require('express-fileupload');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(fileUpload());

app.use(express.static('uploads'));

app.use(cors(corsOptions));

app.use(bps.json());

app.use(bps.urlencoded({extended: true}));

db.sequelize.sync();

// app.use((req, res, next) => {
//   const allowedIPs = [
//     "192.168.4.105",
//   ];
//   if (allowedIPs.includes(req.ip.substr(7)) === true) {
//     return res.status(422).send({ message: ":)", status: "failed" });
//   }
//   next();
// });

api = require('./api');
app.use("/api/cu", api);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});