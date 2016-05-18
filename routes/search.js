var debug = require('debug')('giffie-frontend-search');
var express = require('express');
var exphbs = require('express-handlebars');
var request = require('request');
var router = express.Router();

var expressHandlebars = exphbs.create({
    extname: '.hbs',
    partialsDir: __dirname +'/../src/templates/partials',
    layoutsDir: __dirname +'/../src/templates/layouts'
});

var searchResultPartial;

router.get('/', function (req, res) {

    res.render('search', {
        dev: process.env.NODE_ENV !== 'production'
    });
});

// TODO Error handling

router.get('/search/:query', function (req, res) {

    if ( req.params.query ) {

        request.get({
            url: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q='+
                    req.params.query.replace( /[-]+/ig, '+'),
            json: true
        }, function ( error, response, body ) {

            if ( ! error && response.statusCode == 200 ) {

                if ( req.query.format && req.query.format === 'partial' ) {

                    if ( searchResultPartial ) {

                        res.send( searchResultPartial({
                            results: body.data,
                            pagination: body.pagination
                        }) );
                        res.end();

                    } else {

                        expressHandlebars.getPartials().then( function ( partials ) {

                            searchResultPartial = partials['search-results'];

                            res.send( searchResultPartial({
                                results: body.data,
                                pagination: body.pagination
                            }) );
                            res.end();
                        }, function () {
                            debug('error getting partials');
                            res.end('');
                        } );
                    }

                } else {

                    res.render('search', {
                        q: req.params.query.replace( /-/ig, ' ' ),
                        results: body.data,
                        pagination: body.pagination,
                        dev: process.env.NODE_ENV !== 'production'
                    });
                }

            } else {
                res.end('');
            }
        });

    } else {

        res.render('search', {
            q: req.params.query.replace( /-/ig, ' ' ),
            dev: process.env.NODE_ENV !== 'production'
        });
    }
});

module.exports = router;