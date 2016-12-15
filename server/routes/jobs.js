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
})

module.exports = router;
