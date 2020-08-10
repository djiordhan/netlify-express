const express = require('express');
var cors = require('cors');
import * as pjson from '../package.json';

const serverless = require('serverless-http');

const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        'version': pjson.version,
        'hello': 'formbird'
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);