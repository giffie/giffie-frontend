# giffie frontend
This is the front end of [giffie.nl](http://www.giffie.nl), serving you
animated GIFs of Dutch culture. 'Giffie' is the Dutch word for a small GIF.
A small GIF for a tiny country, but with some great culture that needs
to be GIFted.

Currently in dev mode; using the awesome [Giphy](https://github.com/Giphy/GiphyAPI).

# installation

Just an `npm install` should do the trick.

# running

## dev mode

`npm run dev` builds the dev environment in a `dev/` folder and runs an 
[Express server](http://expressjs.com/)
on which you can visit the site at [localhost:4000/dev](http://localhost:4000).

You can run `npm run watch:dev` to rebuild the dev folder's contents on any change
in `src/`.

## production mode

`npm run prod` builds the production environment in a `dist/` folder and runs an 
[Express server](http://expressjs.com/)
on which you can visit the site at [localhost:4000](http://localhost:4000).

This site has a self executing JavaScript bundle that holds no dependency on any
framework any more. You can deploy the contents of this folder to your live site.

You can run `npm run watch:prod` to rebuild the dist folder's contents on any change
in `src/`.

# todo
-   code/SASS linters
-   doc generators
-   unit tests.