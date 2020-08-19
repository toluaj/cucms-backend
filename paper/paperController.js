var db = require('../db');

exports.submitPaper = async (req, res) => {

    const {
        title,
        conference_id
    } = req.body;

    if(!title) {
        res.send({message: "please add title"})
    }

    var paperfile = req.files.paper;

    await db.paper.create({
        title,
        paper:paperfile.name,
        user_id: req.user.id,
        path: `${paperfile.name}`,
        file_type: `${paperfile.mimetype}`,
        conference_id
    }).then((data) => {

        if(!data) {
            res.send({
                status: false,
                message: "could not upload file"
            })

        }

        paperfile.mv(__dirname+ '/papers/' + paperfile.name,
            function (error)  {
                if(error) {
                    console.log("couldn't upload game file");
                    console.log(error);
                }
                else {
                    console.log("File successfully uploaded");
                }
            })

        res.send({
            status: true,
            message: "File uploaded",
            data: {
                name: paperfile.name,
                mimetype: paperfile.mimetype,
                size: paperfile.size,
                path: `${paperfile.name}`,
                data
            }
        })
    })
        .catch (err => {
            res.status(500).send(err.message);
            console.log(err.message);
        })

}