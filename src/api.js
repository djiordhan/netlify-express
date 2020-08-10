const express = require('express');

const serverless = require('serverless-http');

const app = express();

app.use(cors());

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        'hello': 'formbird'
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);