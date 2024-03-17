const express = require('express')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')

const server = express()
server.use(cors())
server.use(express.json())
server.use(bodyParser())

server.use('/', express.static(__dirname + '/public'))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const length = getFilesCount() + 1
        cb(null, file.originalname + "-" + Date.now() + length + '.jpg');
    }
});

server.use(multer({ storage: storageConfig }).single("file"));
server.post('/upload', (req, res) => {

    console.log('File!')
    
    res.status(200).send('Good!')
 
})

const port = 8080
server.listen(
    port, () => {
        console.log("Static-server! Port: http://localhost:" + port);
    }
)