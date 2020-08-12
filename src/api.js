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

const postData = [];

router.get('/', (req, res) => {

    let tableHTML = '<table style="width: 100%"><tr><td><b>Time</b></td><td><b>Data</b></td></tr>';

    for (const data of postData) {
        tableHTML += `<tr><td>${data.date}</td><td>${JSON.stringify(data.data)}</td></tr>`;
    }
    tableHTML += '</table>';

    res.send(`
    <html>
        <body>
            ${tableHTML}
        </body>
    </html>
    `);
});

router.post('/', (req, res) => {

    postData.push({
        date: new Date(),
        data: JSON.parse(req.body)
    });

    res.json({
        'version': pjson.version,
        'body': JSON.parse(req.body)
    });
});


app.use('/api', router);
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);