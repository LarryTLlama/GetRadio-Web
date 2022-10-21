const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const request = require('request');

app.all((req, res) => {
    console.log(req.originalUrl)
})
app.get('/api/v1/stream/', (req, res) => {
let param = req.query.q;
console.log('Stream URL: ', param)
req.pipe(request.get(param)).pipe(res)
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


app.listen(3000);
console.log('App listening now. Port: 3000')