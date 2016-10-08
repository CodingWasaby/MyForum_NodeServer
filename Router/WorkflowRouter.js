var express = require('express');
var router = express.Router();
var config = require('../Tools/Config');

exports.router = router;

router.get('/EditWorkflow', function (req, res) {
    res.render('workflow/EditWorkflow', { title: '设计工作流' });
});