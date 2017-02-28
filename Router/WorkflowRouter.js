var express = require('express');
var router = express.Router();
var config = require('../Tools/Config');

exports.router = router;

router.get('/EditWorkflow', function (req, res) {
    res.render('workflow/EditWorkflow');
});

router.get('/WorkflowList', function (req, res) {
    res.render('workflow/WorkflowList');
});