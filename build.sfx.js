/**
 * To create a self executing bundle with no need for SystemJS
 */

var Builder = require('systemjs-builder');
var builder = new Builder();

// builder is executed in Node environment, not browser so we use absolute paths.
builder.loadConfig( __dirname +'/systemjs.config.js')

    .then( function () {

        // overwrite basePath for bundling
        builder.config({ baseURL: __dirname +'/' });

        return builder.buildStatic( __dirname +'/src/js/impl.js', __dirname +'/dist/js/impl.sfx.js', { minify: true });
    });