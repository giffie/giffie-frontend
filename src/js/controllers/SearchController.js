import Stapes from 'stapes';
import $ from 'jquery';

import AbstractController from './AbstractController.js';

var SearchController = AbstractController.subclass({

    constructor: function ( $container ) {

        AbstractController.prototype.constructor.call( this, $container );

        this.bindViewEvents();
    },

    bindViewEvents: function () {

        this.$container.on('submit', 'form', this.handleSearchRequest.bind( this ) );
        this.$container.on('click', '[data-gifid]', this.handleGifDetailRequest.bind( this ) );
    },

    handleGifDetailRequest: function ( e ) {
        e.preventDefault();
        e.stopPropagation();

        var state = {
            path: '/gifs/'+ $( e.currentTarget ).data('gifid'),
            query: ''
        };

        history.pushState( state, '', state.path );

        this.emit('pushstate:foreign', this.getNavigationState() );
    },

    handleSearchRequest: function ( e ) {
        e.preventDefault();
        e.stopPropagation();

        var searchQuery = this.$container.find('[data-input]')
                            .val()
                            .replace( /[^\w\s]+/ig, '' )
                            .replace( /[\s]+/ig, '-' );

        var state = {
            path: '/search/'+ searchQuery,
            query: ''
        };

        history.pushState( state, '', state.path );

        this.checkNavigationState();
    },

    handleNavigationState: function ( state ) {

        // TODO get search results partial if already on the search page, else replace the entire body

        var dataUrl = state.path + ( ( state.query )? state.query +'&': '?' ) +'format=partial';

        var inputValue = /\/search\/([^\/\?]+)/ig.exec( state.path );

        if ( inputValue && inputValue.length > 1 ) {
            inputValue = inputValue[ 1 ].replace(/-/ig, ' ');
            this.$container.find('[data-input]').val( inputValue );
        }

        $.ajax({
            url: dataUrl,
            dataType: 'html'
        }).then( function ( data ) {

            this.$container.find('.search-results').replaceWith( $(data) );

        }.bind( this ), function () {

        });
    }
});

SearchController.knowsHowToHandle = function ( route ) {
    return '/' === route || /\/\?/.test( route ) || /\/search\//ig.test( route );
};

export default SearchController;