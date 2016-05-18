import Stapes from 'stapes';
import $ from 'jquery';

import AbstractController from './AbstractController.js';

var DetailController = AbstractController.subclass({

    constructor: function ( $container ) {

        AbstractController.prototype.constructor.call( this, $container );
    },

    handleNavigationState: function ( state ) {

        $.ajax({
            url: state.path,
            dataType: 'html'
        }).then( function ( data ) {

            this.$container.html( data );

        }.bind( this ), function () {

        });
    }
});

DetailController.knowsHowToHandle = function ( route ) {
    return /\/gifs\//ig.test( route );
};

export default DetailController;