var debug = require('debug')('giffie-frontend-details');
var express = require('express');
var exphbs = require('express-handlebars');
var request = require('request');
var router = express.Router();

router.get('/gifs/:id', function (req, res) {

    // TODO error handling

    if ( req.params.id ) {

        request.get({
            url: 'http://api.giphy.com/v1/gifs/'+ req.params.id +'?api_key=dc6zaTOxFJmzC&q=',
            json: true
        }, function ( error, response, body ) {

            if ( ! error && response.statusCode == 200 ) {

                res.render('detail', {
                    gif: body.data,
                    dev: process.env.NODE_ENV !== 'production'
                });

            } else {
                res.end('');
            }
        });
    } else {
        res.end('');
    }
});

module.exports = router;