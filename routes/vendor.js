var express = require('express');
var router = express.Router();

router.use( '/node_modules', express.static( __dirname +'/../node_modules') );


module.exports = router;