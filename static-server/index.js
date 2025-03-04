const express = require('express')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const server = express()
server.use(cors())
server.use(bodyParser.json())

server.use('/static', express.static(__dirname + '/public'))

server.get('/static/test', (req, res) => {

    res.send('/static/test').status(200).end()
})

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        req.fileName = `${Date.now()}${path.extname(file.originalname) }` 
        cb(null, req.fileName);
    }
});

server.use(multer({ storage: storageConfig }).single("file"));
server.post('/static/upload', (req, res) => {
    
    res.status(200).send(req.fileName)
 
})

server.delete('/static', async (req, res) => {

    if (req.query.url === 'EMPTY_IMAGE.png') {
        res.status(503).end()
    }
    else {
        const url = path.resolve(__dirname, 'public', req.query.url)

        try {
            fs.unlinkSync(url)
            res.status(200).end()
            
        } catch(err) {
            res.status(500).end()
        }
    }

})

const port = 8080
server.listen(
    port, () => {
        console.log("Static-server! Port: http://localhost:" + port);
    }
)