var express = require('express');
var fs = require('fs');
var router = express.Router();

if ( process.env.NODE_ENV !== 'production' ) {
    router.use( '/systemjs.config.js', function ( req, res ) {

        fs.readFile( __dirname +'/../systemjs.config.js', function ( err, data ) {
            if ( err ) {
                res.end('error');
            } else {
                res.type('application/javascript');
                res.send( data.toString() );
            }
        } );

    } );
    router.use( '/css', express.static( __dirname + '/../dev/css' ) );
    router.use( '/', express.static( __dirname + '/../src' ) );
} else {
    router.use( '/', express.static( __dirname + '/../dist' ) );
}

module.exports = router;