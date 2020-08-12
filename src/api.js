const express = require('express');
const cors = require('cors');
const pjson = require('../package.json');
const bodyParser = require('body-parser');
const moment = require('moment');
const requestIp = require('request-ip');
const serverless = require('serverless-http');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestIp.mw())

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();

const postData = [
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },{
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },
    {
        data: new Date(),
        data: { "test": "test "}
    },{
        data: new Date(),
        data: { "test": "test "}
    }
];

router.get('/', (req, res) => {

    let tableHTML = `<table id="table" style="width: 100%">
                        <thead>
                        <tr>
                        <td><b>IP</b></td>
                        <td><b>Time</b></td>
                        <td><b>Data</b></td>
                        </tr>
                        </thead>`;

    for (const data of postData) {
        tableHTML += `<tr><td>${data.ip}</td><td>${moment(data.date).fromNow()}</td><td><textarea class="code">${JSON.stringify(data.data, null, 4)}</textarea></td></tr>`;
    }
    tableHTML += '</table>';

    res.send(`
    <html>
        <style>
            .CodeMirror {
                height: auto;
            }
        </style>
        <body>
            ${tableHTML}
        </body>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.css">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.css">
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/mode/javascript/javascript.min.js"></script>
        <script>
            $(document).ready( function () {
                function qsa(sel) {
                    return Array.apply(null, document.querySelectorAll(sel));
                }

                qsa(".code").forEach(function (editorEl) {
                    var cm = CodeMirror.fromTextArea(editorEl, { mode: "javascript", readOnly: true, lineNumbers: true });
                    cm.setSize(null, 150);
                });

                $('#table').DataTable();
            });
        </script>
    </html>
    `);
});

router.post('/', (req, res) => {

    postData.push({
        date: new Date(),
        ip: req.clientIp,
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