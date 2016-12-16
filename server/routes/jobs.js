var express = require('express');
var jobs = require('../models/jobs.js');
var router = express.Router();

router.get('/', function allJobs(req, res) {
    jobs.getAll(function dataRetrieved(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(data);
    })
});

router.get('/:id([a-f0-9]{24})', function oneJob(req, res) {
    jobs.getOne(req.params.id, function jobRetrieved(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        res.json(data);
    });
});

router.post('/', function createJob(req, res) {
    console.log(req.body);
    jobs.create(req.body, function dataCreated(err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Not Today Bro..');
            return;
        }
        res.json(data);
    });
});





module.exports = router;
