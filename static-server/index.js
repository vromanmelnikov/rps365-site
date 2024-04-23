const express = require('express')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')

const server = express()
server.use(cors())
server.use(bodyParser.json())

server.use('/', express.static(__dirname + '/public'))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        req.fileName = Date.now() + '.jpg'
        cb(null, req.fileName);
    }
});

server.use(multer({ storage: storageConfig }).single("file"));
server.post('/static/upload', (req, res) => {
    
    res.status(200).send(req.fileName)
 
})

const port = 8080
server.listen(
    port, () => {
        console.log("Static-server! Port: http://localhost:" + port);
    }
)