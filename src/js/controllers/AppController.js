import $ from 'jquery';
import Stapes from 'stapes';

import AbstractController from './AbstractController.js';

import DetailController from './DetailController.js';
import SearchController from './SearchController.js';

export default AbstractController.subclass({

    constructor: function () {

        AbstractController.prototype.constructor.call( this, $('.container') );

        this.controllers = [
            {
                constructor: SearchController
            },
            {
                constructor: DetailController
            }
        ];

        this.handleInitialState();
    },

    /**
     * Transfers pushstates that controllers can't handle to controllers that can
     */
    handleExternalPushState: function ( state ) {

        this.controllers.forEach( function ( controller ) {
            if ( controller.constructor.knowsHowToHandle( state.path ) ) {

                if ( ! controller.instance ) {
                    this.initController( controller );
                }

                controller.instance.handleNavigationState( state );
            }
        }.bind( this ));
    },

    handleInitialState: function () {

        var initialState = this.getNavigationState();

        this.controllers.forEach( function ( controller ) {
            if ( ! controller.instance && controller.constructor.knowsHowToHandle( initialState.path ) ) {

                this.initController( controller );
            }
        }.bind( this ) );
    },

    handleNavigationState: function ( state ) {

    },

    initController: function ( controller ) {
        controller.instance = new controller.constructor( this.$container );
        controller.instance.on('pushstate:foreign', this.handleExternalPushState.bind( this ));
    }
});