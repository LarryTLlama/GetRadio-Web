const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
var internetradio = require('node-internet-radio')
require("dotenv").config()

app.all((req, res) => {
    console.log(req.originalUrl)
})
app.get('/api/v1/stream/', (req, res) => {
let param = req.query.q;
console.log('Stream URL: ', param)
request(param).pipe(res);
/*.then((result) => {
    console.log(result.data)
    res.status(200);
    result.data.pipe(res);
})
.catch((e) => {
    res.status(400).json({
        status: "Error",
        error: `${e}`
    })
})*/
})

var http = require("http");
var cors = require('cors')
var icy = require('icy')
var corsOptions = {
  origin: 'https://getradio.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.get('/api/v1/stream', (req, result) => {
  result.set('Content-Type', 'audio/mpeg')
icy.get(req.query.q, (res) => {
  
  res.pipe(result);
})
})

app.get('/api/v1/metadata', (req, res) => {
  internetradio.getStationInfo(req.query.q, function(error, station) {
    if(error) {
        res.json({error: `${error}`})
    }
    res.json(station)
  });
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/searchpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'searchpage.html'))
})

app.get('/:file', (req, res) => {
    console.log(req.params.file);
    if(!req.params.file) return res.sendFile(path.join(__dirname, 'index.html'));
    res.sendFile(path.join(__dirname, req.params.file));
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening now. Port: ${PORT}`)
});