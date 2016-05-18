var debug = require('debug')('giffie-frontend');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
var server = require('http').Server( app );

// binding to 0.0.0.0 allows connections from any other computer in the network
// to your ip address
var ipAddress = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 4000;

var appRouter = require('./routes/app');
var gifsRouter = require('./routes/gifs');
var searchRouter = require('./routes/search');
var vendorRouter = require('./routes/vendor');

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'src/templates/partials',
    layoutsDir: 'src/templates/layouts'
}));

app.set('view engine', '.hbs');

app.set('views', 'src/templates');

app.use( vendorRouter );
app.use( appRouter );
app.use( gifsRouter );
app.use( searchRouter );


server.listen( port, ipAddress, function () {

    debug( 'started on localhost:' + port );

} );
