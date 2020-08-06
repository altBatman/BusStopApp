const express = require('express');
const dvb = require('dvbjs');

const app = express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    next();
})

app.get('/api/search/:query', (req,res,next)=>{
    dvb.findStop(req.params.query).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send('Server Error');
    })
});

app.get('/api/plan/:id', (req,res,next)=>{
    dvb.monitor(req.params.id,0,10).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).send(err.message);
    })
});

module.exports = app;