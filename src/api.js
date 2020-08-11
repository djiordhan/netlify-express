const express = require('express');
const cors = require('cors');
const pjson = require('../package.json');
const bodyParser = require('body-parser');

const serverless = require('serverless-http');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        'version': pjson.version
    });
});

router.post('/', (req, res) => {
    res.json({
        'version': pjson.version,
        'body': JSON.parse(req.body)
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);